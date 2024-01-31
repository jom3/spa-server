import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { AnimalDetails } from './entities/animal.details.entity';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import * as fs from 'fs';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    @InjectRepository(AnimalDetails)
    private readonly animalDetailsRepository: Repository<AnimalDetails>,
  ) {}
  async create(createAnimalDto: CreateAnimalDto, file?: Express.Multer.File) {
    const { bornBy, maxAge, ...toCreate } = createAnimalDto;
    try {
      const animal = this.animalRepository.create({
        image: `${file ? file.filename : null}`,
        ...toCreate,
      });
      await this.animalRepository.save(animal).then(
        async (animal) =>
          await this.animalDetailsRepository.save(
            this.animalDetailsRepository.create({
              bornBy,
              maxAge: +maxAge,
              animalDetailId: animal.animalId,
            }),
          ),
      );
      return 'Animal created';
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const animals = await this.animalRepository.find({
      take: limit,
      skip: offset,
    });
    return animals;
  }

  async findOne(id: string) {
    const animal = await this.animalRepository.findOneBy({ animalId: id });
    if (!animal) {
      throw new NotFoundException(`There is not an animal with ID: ${id}`);
    }
    return animal;
  }

  async findOneByName(name: string) {
    const animal = await this.animalRepository.findOneBy({ name });
    if (!animal) {
      throw new NotFoundException(`There is not an animal with name: ${name}`);
    }
    return animal;
  }

  async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
    file?: Express.Multer.File,
  ) {
    const { bornBy, maxAge, ...toUpdate } = updateAnimalDto;
    const animalData = await this.findOne(id);
    if (file) {
      try {
        fs.unlinkSync('static' + `/animal/${animalData.image}`);
      } catch (error) {
        throw new BadRequestException('file could not be deleted');
      }
    }
    try {
      const animal = await this.animalRepository.preload({
        animalId: id,
        image: `${file ? file.filename : animalData.image}`,
        ...toUpdate,
      });
      if (!animal)
        throw new NotFoundException(`There is not an animal with ID: ${id}`);

      if (bornBy || maxAge) {
        const animalDetail = await this.animalDetailsRepository.preload({
          animalDetailId: id,
          bornBy,
          maxAge: +maxAge,
        });
        if (!animalDetail)
          throw new NotFoundException(`There is not an animal with ID: ${id}`);
        await this.animalDetailsRepository.save(animalDetail);
      }
      await this.animalRepository.save(animal);
    } catch (error) {
      this.handleError(error);
    }
    return `The animal was updated`;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.animalRepository.update({ animalId: id }, { isActive: false });
    return `The animal was deleted`;
  }

  async restore(id: string) {
    await this.findOne(id);
    await this.animalRepository.update({ animalId: id }, { isActive: true });
    return `The animal was restored`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException('There is an animal with that name');
    }
    throw new InternalServerErrorException('Contact with the ADMIN');
  }
}
