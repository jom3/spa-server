import { PartialType } from '@nestjs/mapped-types';
import { CreateAttentionDetailDto } from './create-attention-detail.dto';

export class UpdateAttentionDetailDto extends PartialType(CreateAttentionDetailDto) {}
