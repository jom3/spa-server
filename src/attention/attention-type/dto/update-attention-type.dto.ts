import { PartialType } from '@nestjs/mapped-types';
import { CreateAttentionTypeDto } from './create-attention-type.dto';

export class UpdateAttentionTypeDto extends PartialType(CreateAttentionTypeDto) {}
