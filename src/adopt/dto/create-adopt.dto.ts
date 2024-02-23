import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ControlType } from "../entities/adopt.entity";

export class CreateAdoptDto {
  @IsString()
  @IsNotEmpty()
  userId:string
  @IsString()
  @IsNotEmpty()
  animalId:string;
  @IsString()
  @IsNotEmpty()
  animalName:string;
  @IsString()
  @IsNotEmpty()
  reason:string;
  @IsEnum(ControlType)
  @IsNotEmpty()
  controlType:ControlType;
}
