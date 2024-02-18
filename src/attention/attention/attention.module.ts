import { Module } from '@nestjs/common';
import { AttentionService } from './attention.service';
import { AttentionController } from './attention.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attention } from './entities/attention.entity';
import { AttentionDetail } from './entities/attention-detail.entity';
import { AttentionType } from '../attention-type/entities/attention-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Attention, AttentionDetail, AttentionType])],
  controllers: [AttentionController],
  providers: [AttentionService],
})
export class AttentionModule {}
