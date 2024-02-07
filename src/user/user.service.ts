import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDetails } from './entities/user-details.entity';
import { PaginationDto } from '../shared/dtos/pagination.dto';
import { join } from 'path';
import { existsSync } from 'fs';
import * as fs from 'fs';
import { Auth } from 'src/auth/entities/auth.entity';
import { passwordGenerator } from 'src/shared/helpers/passwordGenerator.helper';
import { encryptPassword } from 'src/shared/helpers/encryptPassword.helper';
import { sendEmail } from 'src/shared/helpers/sendEmail.helper';
import { ReasonType, generateMessage } from 'src/shared/helpers/generateMessage.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    const { address1, address2, city, telephone, ...toCreate } = createUserDto;
    try {
      const user = this.userRepository.create({
        photo: `${file ? file.filename : null}`,
        ...toCreate,
      });
      await this.userRepository
        .save(user)
        .then(async (user) => {
          const generatedPassword = passwordGenerator();
          const encryptedPassword = await encryptPassword(generatedPassword);
          await this.userDetailsRepository.save(
            this.userDetailsRepository.create({
              userId: user.userId,
              address1,
              address2,
              city,
              telephone,
            }),
          );
          await this.authRepository.save(this.authRepository.create({
            password:encryptedPassword,
            email: user.email,
            userId: user.userId,
          })).then(async()=>{
            const message = generateMessage(user.email, ReasonType.NEW, generatedPassword);
            await sendEmail(user.email, message);
          })
        })
      return 'New user created';
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return users;
  }

  findProfileImage(profileFile: string) {
    const path = join(__dirname, '../../static/user/profile', profileFile);
    if (!existsSync(path)) {
      throw new BadRequestException(
        `No user image found with name ${profileFile}`,
      );
    }
    return path;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException(`There's not a user with id: ${id}`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const { address1, address2, city, telephone, ...toUpdate } = updateUserDto;
    const userData = await this.findOne(id);
    if (file) {
      try {
        fs.unlinkSync('static' + `/user/profile/${userData.photo}`);
      } catch (error) {
        throw new BadRequestException('file could not be deleted');
      }
    }
    try {
      const user = await this.userRepository.preload({
        userId: id,
        photo: `${file ? file.filename : userData.photo}`,
        ...toUpdate,
      });
      const userdetails = await this.userDetailsRepository.preload({
        userId: id,
        address1,
        address2,
        city,
        telephone,
      });
      await this.userRepository
        .save(user)
        .then(async () => await this.userDetailsRepository.save(userdetails));
      return `User was updated`;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userRepository.update({ userId: id }, { status: false });
    return `User was removed`;
  }

  async restore(id: string) {
    await this.findOne(id);
    await this.userRepository.update({ userId: id }, { status: true });
    return `User was restored`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error)
    throw new InternalServerErrorException('Contact with the ADMIN');
  }
}
