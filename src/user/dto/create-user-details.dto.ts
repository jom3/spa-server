import { IsOptional, IsString } from "class-validator";

export class CreateUserDetailsDto {
  @IsString()
  @IsOptional()
  userId: string;
  @IsString()
  @IsOptional()
  address1: string;
  @IsString()
  @IsOptional()
  address2: string;
  @IsString()
  telephone: string;
  @IsString()
  city: string;
}
