import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAttentionTypeDto } from './dto/create-attention-type.dto';
import { UpdateAttentionTypeDto } from './dto/update-attention-type.dto';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttentionType } from './entities/attention-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttentionTypeService {
  constructor(
    @InjectRepository(AttentionType)
    private readonly attentionTypeRepository: Repository<AttentionType>,
  ) {}

  async create(createAttentionTypeDto: CreateAttentionTypeDto) {
    try {
      const attentionType = this.attentionTypeRepository.create(
        createAttentionTypeDto,
      );
      await this.attentionTypeRepository.save(attentionType);
      return 'New attention type added';
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const attentionTypes = await this.attentionTypeRepository.find({
      take: limit,
      skip: offset,
    });
    return attentionTypes;
  }

  async findOne(id: string) {
    const attentionType = await this.attentionTypeRepository.findOneBy({
      attentionTypeId: id,
    });
    if (!attentionType) {
      throw new NotFoundException(
        `There's not an attention type with id: ${id}`,
      );
    }
    return attentionType;
  }

  async update(id: string, updateAttentionTypeDto: UpdateAttentionTypeDto) {
    try {
      const attentionType = await this.attentionTypeRepository.preload({
        attentionTypeId:id,
        ...updateAttentionTypeDto
      });
      if (!attentionType) {
        throw new NotFoundException(
          `There's not an attention type with id: ${id}`,
        );
      }
      await this.attentionTypeRepository.save(attentionType)
      return `Attention typed was updated`;
    } catch (error) {
      this.handleError(error)
    }
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.attentionTypeRepository.update({attentionTypeId:id},{status:false})
    return `The attention type was removed`;
  }

  async restore(id: string) {
    await this.findOne(id)
    await this.attentionTypeRepository.update({attentionTypeId:id},{status:true})
    return `The attention type was restored`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException({msg:'Contact with the ADMIN',error});
  }
}
