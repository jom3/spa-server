import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UploadedFile,
  UseInterceptors,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/shared/helpers/fileNamer.helper';
import { fileFilter } from 'src/shared/helpers/fileFilter.helper';
import { createReadStream } from 'fs';


export const multerOptions = {
  storage: diskStorage({
    destination: './static/animal',
    filename: fileNamer,
  }),
  fileFilter: fileFilter,
  limits: {fileSize: 1024*1024},
};

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', multerOptions),
  )
  create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.animalsService.create(createAnimalDto, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.animalsService.findAll(paginationDto);
  }

  @Get('allAdoptables')
  findAllAdoptables(@Query() paginationDto: PaginationDto) {
    return this.animalsService.findAllAdoptables(paginationDto);
  }

  @Get('file/:animalFile')
  @Header('Content-Type', 'image/jpeg')
  findAnimalImage(@Param('animalFile') animalFile:string){
    const stream = createReadStream(this.animalsService.findAnimalImage(animalFile));
    return new StreamableFile(stream)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.findOne(id);
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.animalsService.findOneByName(name);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('file', multerOptions),
  )
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.animalsService.update(id, updateAnimalDto, file);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.remove(id);
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.restore(id);
  }
}

