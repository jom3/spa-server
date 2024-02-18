import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { AnimalDetails } from './entities/animal.details.entity';
import { Attention } from 'src/attention/attention/entities/attention.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Animal, AnimalDetails,Attention])
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
