import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AttentionService } from './attention.service';
import { CreateAttentionDto } from './dto/create-attention.dto';
import { UpdateAttentionDto } from './dto/update-attention.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { CreateAttentionDetailDto } from './dto/create-attention-detail.dto';
import { UpdateAttentionDetailDto } from './dto/update-attention-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/shared/helpers/fileNamer.helper';
import { fileFilter } from 'src/shared/helpers/fileFilter.helper';

export const multerOptions = {
  storage: diskStorage({
    destination: './static/animal/attention',
    filename: fileNamer,
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 },
};

@Controller('attention')
export class AttentionController {
  constructor(private readonly attentionService: AttentionService) {}

  @Post()
  create(@Body() createAttentionDto: CreateAttentionDto) {
    return this.attentionService.create(createAttentionDto);
  }

  @Post('createDetail/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  createDetail(
    @Param('id',ParseUUIDPipe) id:string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createAttentionDetailDto:CreateAttentionDetailDto) {
    return this.attentionService.createDetail(id, file, createAttentionDetailDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.attentionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAttentionDto: UpdateAttentionDto) {
    return this.attentionService.update(id, updateAttentionDto);
  }

  @Patch('updateDetail/:id')
  updateDetail(@Param('id', ParseUUIDPipe) id: string, @Body() updateAttentionDetailDto: UpdateAttentionDetailDto) {
    return this.attentionService.updateDetail(id, updateAttentionDetailDto);
  }

  @Delete('complete/:id')
  complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionService.complete(id);
  }

  @Delete('removeDetail/:id')
  removeDetail(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionService.removeDetail(id);
  }
}
