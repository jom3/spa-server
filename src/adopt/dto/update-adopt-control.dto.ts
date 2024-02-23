import { PartialType } from '@nestjs/mapped-types';
import { CreateAdoptControlDto } from './create-adopt-control.dto';

export class UpdateAdoptControlDto extends PartialType(CreateAdoptControlDto) {}
