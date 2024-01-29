import { IsEnum, IsNumber} from "class-validator";
import { BornType } from "../entities/animal.details.entity";

export class CreateAnimalDetailsDto {

  @IsNumber()
  maxAge:number;

  @IsEnum(BornType)
  bornBy:BornType;
}
