import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AnimalsModule } from './animals/animals.module';
import { Animal } from './animals/entities/animal.entity';
import { AnimalDetails } from './animals/entities/animal.details.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { UserDetails } from './user/entities/user-details.entity';

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
      entities: [Animal, AnimalDetails, User, UserDetails],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AnimalsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
