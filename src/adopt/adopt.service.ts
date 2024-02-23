import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdoptDto } from './dto/create-adopt.dto';
import { UpdateAdoptDto } from './dto/update-adopt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Adopt } from './entities/adopt.entity';
import { Not, Repository } from 'typeorm';
import { AdoptControl } from './entities/adopt-control.entity';
import { CreateAdoptControlDto } from './dto/create-adopt-control.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { Animal } from 'src/animals/entities/animal.entity';

@Injectable()
export class AdoptService {
  constructor(
    @InjectRepository(Adopt)
    private readonly AdoptRepository: Repository<Adopt>,
    @InjectRepository(AdoptControl)
    private readonly adoptControlRepository: Repository<AdoptControl>,
    @InjectRepository(Animal)
    private readonly animalRepository:Repository<Animal>
  ) {}

  async create(createAdoptDto: CreateAdoptDto) {
    try {
      const {animalId,...toCreate} = createAdoptDto;
      const validAnimal = await this.animalRepository.findOneBy({animalId, isAdoptable:Not(false)})
      if(!validAnimal){
        throw new BadRequestException(`This animal cannot be adoptable`)
      }
      const adopt = this.AdoptRepository.create({
        animalId,
        ...toCreate
      })
      await this.AdoptRepository.save(adopt)
      return 'New adoption was created';
    } catch (error) {
      this.handleError(error)
    }
  }

  async createControl(id: string, createAdoptControlDto: CreateAdoptControlDto) {
    try {
      await this.findOne(id);
      const adoptControl = this.adoptControlRepository.create({
        adoptId:id,
        ...createAdoptControlDto
      })
      await this.adoptControlRepository.save(adoptControl)
      return 'New control was created';
    } catch (error) {
      this.handleError(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    const adopts = await this.AdoptRepository.find({
      take:limit,
      skip:offset
    })
    return adopts;
  }

  async findAllControls(id: string, paginationDto: PaginationDto) {
    const {limit=10, offset=0} = paginationDto
    await this.findOne(id)
    const controls = await this.adoptControlRepository.find({
      take:limit,
      skip:offset,
      where:{adoptId:id}
    })
    return controls;
  }

  async findOne(id: string) {
    const adopt = await this.AdoptRepository.findOneBy({adoptId:id})
    if(!adopt){
      throw new NotFoundException(`There's not an adoption with id: ${id}`)
    }
    return adopt;
  }

  async findOneControl(id: string) {
    const control = await this.adoptControlRepository.findOneBy({adoptControlId:id})
    if(!control){
      throw new NotFoundException(`There's not a control in this adoption with id: ${id}`)
    }
    return control;
  }

  async update(id: string, updateAdoptDto: UpdateAdoptDto) {
    try {
      await this.findOne(id)
      const adopt = await this.AdoptRepository.preload({
        adoptId:id,
        ...updateAdoptDto
      })
      await this.AdoptRepository.save(adopt)
      return `The adoption was updated`;
    } catch (error) {
      this.handleError(error)
    }
  }

  async close(id: string) {
    await this.findOne(id)
    await this.AdoptRepository.update({adoptId:id},{status:0,closedAt:new Date()})
    return `The adoption was closed`;
  }

  async return(id: string) {
    await this.findOne(id)
    await this.AdoptRepository.update({adoptId:id},{status:2,returnedAt:new Date()})
    return `The adoption failed and the animal was returned`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('There is an animal with that name');
    }
    if(error.response.statusCode===400){
      throw new BadRequestException(error.response.message)
    }
    throw new InternalServerErrorException('Contact with the ADMIN');
  }
}
