import { IsEnum, IsString} from "class-validator";
import { BornType } from "../entities/animal.details.entity";

export class CreateAnimalDetailsDto {

  @IsString()
  maxAge:string;

  @IsEnum(BornType)
  bornBy:BornType;
}
