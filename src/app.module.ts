import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AnimalsModule } from './animals/animals.module';
import { Animal } from './animals/entities/animal.entity';
import { AnimalDetails } from './animals/entities/animal.details.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserDetails } from './user/entities/user-details.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { AttentionsModule } from './attention/attentions.module';
import { AttentionType } from './attention/attention-type/entities/attention-type.entity';
import { Attention } from './attention/attention/entities/attention.entity';
import { AttentionDetail } from './attention/attention/entities/attention-detail.entity';
import { AdoptModule } from './adopt/adopt.module';
import { Adopt } from './adopt/entities/adopt.entity';
import { AdoptControl } from './adopt/entities/adopt-control.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      entities: [
        Adopt,
        AdoptControl,
        Animal,
        AnimalDetails,
        Attention,
        AttentionDetail,
        AttentionType,
        Auth,
        User,
        UserDetails,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AnimalsModule,
    UserModule,
    AuthModule,
    AttentionsModule,
    AdoptModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
