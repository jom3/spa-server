import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { AnimalType } from "../entities/animal.entity";
import { AnimalDetails } from "../entities/animal.details.entity";
import { CreateAnimalDetailsDto } from "./create-animal-details.dto";

export class CreateAnimalDto extends CreateAnimalDetailsDto{
  @IsString()
  name:string;

  @IsString()
  @IsOptional()
  image?:string;

  @IsBoolean()
  @IsOptional()
  isExtinct?:boolean;
  
  @IsBoolean()
  @IsOptional()
  isActive?:boolean;

  @IsString()
  species:string;

  @IsEnum(AnimalType)
  @IsOptional()
  type?:AnimalType;

  @IsOptional()
  animalDetails?:AnimalDetails;

}
