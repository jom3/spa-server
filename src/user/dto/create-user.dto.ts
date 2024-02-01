import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { userRole } from '../entities/user.entity';
import { UserDetails } from '../entities/user-details.entity';
import { CreateUserDetailsDto } from './create-user-details.dto';

export class CreateUserDto extends CreateUserDetailsDto {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsOptional()
  photo: string;
  @IsString()
  email: string;
  @IsString()
  dni: string;
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
  @IsArray()
  @IsEnum(userRole, { each: true })
  role: userRole[];
  @IsOptional()
  userDetails: UserDetails;
}
