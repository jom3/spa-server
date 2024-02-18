import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttentionTypeDto {
  @IsString()
  @IsNotEmpty()
  name:string;
  @IsString()
  @IsOptional()
  desc?:string;
}
