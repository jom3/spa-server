import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/user-details.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AttentionDetail } from 'src/attention/attention/entities/attention-detail.entity';
import { Adopt } from 'src/adopt/entities/adopt.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,UserDetails, Auth, AttentionDetail,Adopt]),
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserModule {}
