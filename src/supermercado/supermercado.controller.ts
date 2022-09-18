import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SupermercadoService } from './supermercado.service'; 
import { SupermercadoDto } from './supermercado.dto';
import { SupermercadoEntity } from './supermercado.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('supermarkets')
export class SupermercadoController { 
    constructor(private readonly SupermercadoService: SupermercadoService) {}

    //Método findAll
    @Get()
    async findAll() {
      return await this.SupermercadoService.findAll();
    }

    //Método findOne
    @Get(':supermercadoId')
    async findOne(@Param('supermercadoId') supermercadoId: string) {
        return await this.SupermercadoService.findOne(supermercadoId);
    }

    //Método create
    @Post()
    async create(@Body() supermercadoDto: SupermercadoDto) {
    const supermercado: SupermercadoEntity = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.SupermercadoService.create(supermercado);
    }

    //Método update
    @Put(':supermercadoId')
    async update(@Param('supermercadoId') supermercadoId: string, @Body() supermercadoDto: SupermercadoDto) {
    const supermercado: SupermercadoEntity = plainToInstance(SupermercadoEntity, supermercadoDto);
    return await this.SupermercadoService.update(supermercadoId, supermercado);
    }

    //Método delete
    @Delete(':supermercadoId')
    @HttpCode(204)
    async delete(@Param('supermercadoId') supermercadoId: string) {
        return await this.SupermercadoService.delete(supermercadoId);
    }

}

