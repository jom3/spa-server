import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  limit:number;
  
  @IsNumber()
  @IsOptional()
  offset:number;
}