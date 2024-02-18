import { Module } from '@nestjs/common';
import { AttentionModule } from './attention/attention.module';
import { AttentionTypeModule } from './attention-type/attention-type.module';

@Module({
  imports: [AttentionModule, AttentionTypeModule]
})
export class AttentionsModule {}
