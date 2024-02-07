import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RecoverDto{
 
  @IsEmail()
  @IsNotEmpty()
  email:string;
  
  @IsString()
  telephone: string;
}