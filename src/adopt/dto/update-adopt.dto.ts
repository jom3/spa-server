import { PartialType } from '@nestjs/mapped-types';
import { CreateAdoptDto } from './create-adopt.dto';

export class UpdateAdoptDto extends PartialType(CreateAdoptDto) {}
