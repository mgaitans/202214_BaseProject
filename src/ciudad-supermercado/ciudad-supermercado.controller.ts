import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service'; 
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { CiudadDto } from '../ciudad/ciudad.dto';
import { plainToInstance } from 'class-transformer';

@Controller('ciudad-supermercado')
export class CiudadSupermercadoController {
    constructor(private readonly  ciudadSupermercadoService: CiudadSupermercadoService){}

    /*
    --addSupermarketToCity
    --findSupermarketsFromCity
    --findSupermarketFromCity
    updateSupermarketsFromCity
    deleteSupermarketFromCity
    */

    @Post(':supermarketId/cities/citieId')
    async addSupermarketToCity(@Param('supermarketId') supermarketId: string, @Param('citieId') citieId: string){
        return await this.ciudadSupermercadoService.addSupermarketToCity(supermarketId, citieId);
    }

    @Get(':supermarketId/citie/:citieId')
    async findSupermarketFromCity(@Param('supermarketId') supermarketId: string, @Param('citieId') citieId: string){
        return await this.ciudadSupermercadoService.findSupermarketFromCity(supermarketId, citieId);
    }

    @Get(':supermarketId/cities')
    async findSupermarketsFromCity(@Param('supermarketId') supermarketId: string){
        return await this.ciudadSupermercadoService.findSupermarketsFromCity(supermarketId);
    }
    
    @Put(':supermarketId/cities')
    async updateSupermarketsFromCity(@Body() ciudadesDto: CiudadDto[], @Param('supermarketId') supermarketId: string){
        const cities = plainToInstance(CiudadEntity, ciudadesDto)
        return await this.ciudadSupermercadoService.updateSupermarketsFromCity(supermarketId, cities);
    }

    @Delete(':supermarketId/cities/:citieId')
    @HttpCode(204)
    async deleteSupermarketFromCity(@Param('supermarketId') supermarketId: string, @Param('citieId') citieId: string){
        return await this.ciudadSupermercadoService.deleteSupermarketFromCity(supermarketId, citieId);
    }
    
}


