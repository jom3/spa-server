import { Module } from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { AdoptController } from './adopt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopt } from './entities/adopt.entity';
import { User } from 'src/user/entities/user.entity';
import { Animal } from 'src/animals/entities/animal.entity';
import { AdoptControl } from './entities/adopt-control.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Adopt,Animal, User,AdoptControl])],
  controllers: [AdoptController],
  providers: [AdoptService],
})
export class AdoptModule {}
