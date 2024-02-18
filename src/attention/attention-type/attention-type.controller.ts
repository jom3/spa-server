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
} from '@nestjs/common';
import { AttentionTypeService } from './attention-type.service';
import { CreateAttentionTypeDto } from './dto/create-attention-type.dto';
import { UpdateAttentionTypeDto } from './dto/update-attention-type.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Controller('attention-type')
export class AttentionTypeController {
  constructor(private readonly attentionTypeService: AttentionTypeService) {}

  @Post()
  create(@Body() createAttentionTypeDto: CreateAttentionTypeDto) {
    return this.attentionTypeService.create(createAttentionTypeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.attentionTypeService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionTypeService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttentionTypeDto: UpdateAttentionTypeDto,
  ) {
    return this.attentionTypeService.update(id, updateAttentionTypeDto);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionTypeService.remove(id);
  }

  @Delete('restore/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.attentionTypeService.restore(id);
  }
}
