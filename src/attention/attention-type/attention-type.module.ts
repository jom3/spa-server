import { Module } from '@nestjs/common';
import { AttentionTypeService } from './attention-type.service';
import { AttentionTypeController } from './attention-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttentionType } from './entities/attention-type.entity';
import { Attention } from '../attention/entities/attention.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AttentionType, Attention])],
  controllers: [AttentionTypeController],
  providers: [AttentionTypeService],
})
export class AttentionTypeModule {}
