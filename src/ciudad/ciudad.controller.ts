import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadService } from './ciudad.service'; 
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';


@UseInterceptors(BusinessErrorsInterceptor)
@Controller('cities')
export class CiudadController { 
    constructor(private readonly CiudadService: CiudadService) {}

    //Método findAll
    @Get()
    async findAll() {
      return await this.CiudadService.findAll();
    }

    //Método findOne
    @Get(':ciudadId')
    async findOne(@Param('ciudadId') ciudadId: string) {
        return await this.CiudadService.findOne(ciudadId);
    }

    //Método create
    @Post()
    async create(@Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.CiudadService.create(ciudad);
    }

    //Método update
    @Put(':ciudadId')
    async update(@Param('ciudadId') ciudadId: string, @Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.CiudadService.update(ciudadId, ciudad);
    }

    //Método delete
    @Delete(':ciudadId')
    @HttpCode(204)
    async delete(@Param('ciudadId') ciudadId: string) {
        return await this.CiudadService.delete(ciudadId);
    }

}
