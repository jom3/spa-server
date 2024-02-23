import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdoptControlDto {
  @IsString()
  @IsNotEmpty()
  controlReason: string;
  @IsString()
  @IsNotEmpty()
  animalStatus: string;
  @IsString()
  @IsOptional()
  statusDetail?: string;
  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;
}
