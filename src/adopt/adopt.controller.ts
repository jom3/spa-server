import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { CreateAdoptDto } from './dto/create-adopt.dto';
import { UpdateAdoptDto } from './dto/update-adopt.dto';
import { CreateAdoptControlDto } from './dto/create-adopt-control.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@Controller('adopt')
export class AdoptController {
  constructor(private readonly adoptService: AdoptService) {}

  @Post()
  create(@Body() createAdoptDto: CreateAdoptDto) {
    return this.adoptService.create(createAdoptDto);
  }

  @Post('createControl/:id')
  createControl(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() createAdoptControlDto: CreateAdoptControlDto) {
    return this.adoptService.createControl(id,createAdoptControlDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.adoptService.findAll(paginationDto);
  }

  @Get('allControls/:id')
  findAllControls(
    @Param('id', ParseUUIDPipe) id:string,
    @Query() paginationDto:PaginationDto
  ) {
    return this.adoptService.findAllControls(id,paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptService.findOne(id);
  }

  @Get('control/:id')
  findOneControl(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptService.findOneControl(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdoptDto: UpdateAdoptDto) {
    return this.adoptService.update(id, updateAdoptDto);
  }

  @Delete('closeAdoption/:id')
  close(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptService.close(id);
  }

  @Delete('returnAdoption/:id')
  return(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptService.return(id);
  }
}
