import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttentionDto {
  @IsString()
  @IsNotEmpty()
  attentionTypeId: string;
  @IsString()
  @IsNotEmpty()
  animalId: string;
  @IsString()
  animalName: string;
}
