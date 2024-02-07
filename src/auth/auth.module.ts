import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserDetails } from 'src/user/entities/user-details.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Auth,UserDetails]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
        return {
          global:true,
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'30m'
          }
        }
      }
      
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
