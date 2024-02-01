import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Header,
  StreamableFile,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/shared/helpers/fileNamer.helper';
import { fileFilter } from 'src/shared/helpers/fileFilter.helper';
import { createReadStream } from 'fs';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export const multerOptions = {
  storage: diskStorage({
    destination: './static/user/profile',
    filename: fileNamer,
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 },
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get('file/:profileFile')
  @Header('Content-Type', 'image/jpeg')
  findAnimalImage(@Param('profileFile') profileFile: string) {
    const stream = createReadStream(
      this.userService.findProfileImage(profileFile),
    );
    return new StreamableFile(stream);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.update(id, updateUserDto, file);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.restore(id);
  }
}
