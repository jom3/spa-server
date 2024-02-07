import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RecoverDto } from './dto/recover.dto';
import { UserDetails } from 'src/user/entities/user-details.entity';
import { passwordGenerator } from 'src/shared/helpers/passwordGenerator.helper';
import { encryptPassword } from 'src/shared/helpers/encryptPassword.helper';
import { ReasonType, generateMessage } from 'src/shared/helpers/generateMessage.helper';
import { sendEmail } from 'src/shared/helpers/sendEmail.helper';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(UserDetails)
    private readonly userDetailRepository: Repository<UserDetails>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    try {
      const user = await this.authRepository.findOneBy({ email: email });
      if (!user) {
        throw new UnauthorizedException('Email does not exist');
      }
      if (!compareSync(password, user.password)) {
        throw new UnauthorizedException(
          `Password does not match with email: ${email}`,
        );
      }
      const payload = { userId: user.userId };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async recover(recoverDto: RecoverDto) {
    const { email, telephone } = recoverDto;

    try {
      const authUser = await this.authRepository.findOneBy({email});
      if(!authUser){
        throw new NotFoundException(`There is not a user with email: ${email}`)
      }
      const validUser = await this.userDetailRepository.findOneBy({telephone});
      if(!validUser){
        throw new NotFoundException(`There is not a user with telephone: ${telephone}`)
      }
      const generatedPassword = passwordGenerator();
      const encryptedPassword = await encryptPassword(generatedPassword);
  
      const message = generateMessage(email,ReasonType.RECOVER, generatedPassword);
      await this.authRepository.update({email:email},{password:encryptedPassword})
      .then(()=>sendEmail(email,message))
      return 'Account recovered'
    } catch (error) {
      this.handleError(error)
    }
  }

  async change(changePasswordDto:ChangePasswordDto){
    const {email,password,newPassword,newPasswordRepeated} = changePasswordDto;
    try {
      const user = await this.authRepository.findOneBy({email});
      if(!user){
        throw new NotFoundException(`There is not a user with that email`)
      }

      if(!compareSync(password,user.password)){
        throw new NotFoundException(`The introduced password doesn't match with the current password`)
      }
      if(newPassword!==newPasswordRepeated){
        throw new ConflictException('Repeat you new password twice')
      }
      const encryptedPassword = await encryptPassword(newPassword);
      const message = generateMessage(email,ReasonType.CHANGE);

      await this.authRepository.update({email:email},{password:encryptedPassword})
      .then(()=>sendEmail(email,message))
      return 'Password was changed'
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: any) {
    if (error.status === 401) {
      throw new UnauthorizedException(error.response.message);
    }
    if (error.status === 404) {
      throw new NotFoundException(error.response.message);
    }
    if (error.status === 409) {
      throw new ConflictException(error.response.message);
    }
    throw new InternalServerErrorException(error)
  }
}
