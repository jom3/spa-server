import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttentionDetailDto {
  @IsString()
  @IsNotEmpty()
  attentionId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsOptional()
  reason?: string;
  @IsArray()
  @IsString({each:true})
  @IsOptional()
  image: string[];
}
