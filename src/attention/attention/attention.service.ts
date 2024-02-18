import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { UpdateAttentionDto } from './dto/update-attention.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attention } from './entities/attention.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { CreateAttentionDetailDto } from './dto/create-attention-detail.dto';
import { AttentionDetail } from './entities/attention-detail.entity';
import { UpdateAttentionDetailDto } from './dto/update-attention-detail.dto';

@Injectable()
export class AttentionService {

  constructor(
    @InjectRepository(Attention)
    private readonly attentionRepository:Repository<Attention>,
    @InjectRepository(AttentionDetail)
    private readonly attentionDetailRepository:Repository<AttentionDetail>
  ){}

  async create(createAttentionDto: CreateAttentionDto) {
    try {
      const attention = this.attentionRepository.create(createAttentionDto)
      await this.attentionRepository.save(attention)
      return 'New attention was created';
    } catch (error) {
      this.handleError(error)
    }
  }

  async createDetail(id:string, file:Express.Multer.File, createAttentionDetailDto:CreateAttentionDetailDto) {
    try {
      const attentionDetail = this.attentionDetailRepository.create({
        attentionId:id,
        image: `${file ? file.filename : null}`,
        ...createAttentionDetailDto
      })
      await this.attentionDetailRepository.save(attentionDetail)
      return 'New Detail was created in the Attention';
    } catch (error) {
      this.handleError(error)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    const attentions = await this.attentionRepository.find({
      take:limit,
      skip:offset
    })
    return attentions;
  }

  async findOne(id: string) {
    const attention = await this.attentionRepository.findOneBy({attentionId:id})
    if(!attention){
      throw new NotFoundException(`There's not an attention with id: ${id}`)
    }
    return attention;
  }

  async findOneDetail(id: string) {
    const attentionDetail = await this.attentionDetailRepository.findOneBy({attentionDetailId:id})
    if(!attentionDetail){
      throw new NotFoundException(`There's not an attention detail with id: ${id}`)
    }
    return attentionDetail;
  }
  
  async update(id: string, updateAttentionDto: UpdateAttentionDto) {
    try {
      const attention = await this.attentionRepository.preload({
        attentionId:id,
        ...updateAttentionDto
      })
      if(!attention){
        throw new NotFoundException(`There's not an attention with id: ${id}`)
      }
      await this.attentionRepository.save(attention)
      return `Attention was updated`;
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateDetail(id: string, updateAttentionDetailDto:UpdateAttentionDetailDto) {
    try {
      const attentionDetail = await this.attentionDetailRepository.preload({
        attentionDetailId:id,
        ...updateAttentionDetailDto
      })
      if(!attentionDetail){
        throw new NotFoundException(`There's not an detail with id: ${id}`)
      }
      await this.attentionDetailRepository.save(attentionDetail)
      return `Detail was updated`;
    } catch (error) {
      this.handleError(error)
    }
  }

  async complete(id: string) {
    await this.findOne(id)
    await this.attentionRepository.update({attentionId:id},{status:false})
    return `Attention was closed`;
  }

  async removeDetail(id: string) {
    await this.findOneDetail(id)
    await this.attentionDetailRepository.update({attentionDetailId:id},{status:false})
    return `Attention detail was removed`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException({msg:'Contact with the ADMIN',error});
  }
}
