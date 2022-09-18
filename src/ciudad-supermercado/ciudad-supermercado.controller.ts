import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer'; 
import { CiudadDto } from '../ciudad/ciudad.dto';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';

@Controller('ciudad-supermercado')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
    constructor(private readonly CiudadSupermercadoService: CiudadSupermercadoService){}
    
    @Post(':supermercadoId/cities/:ciudadId')
    async addCiudadSupermercado(@Param('supermercadoId') supermercadoId: string, @Param('ciudadId') ciudadId: string){
       return await this.CiudadSupermercadoService.addCiudadSupermercado(supermercadoId, ciudadId);
    }
    
    @Get(':supermercadoId/cities/:ciudadId')
    async findCiudadBySupermercadoIdCiudadId(@Param('supermercadoId') supermercadoId: string, @Param('ciudadId')ciudadId: string){
        return await this.CiudadSupermercadoService.findCiudadBySupermercadoIdCiudadId(supermercadoId,ciudadId);
    }
    
    @Put(':supermercadoId/cities')
    async associateCiudadSupermercado(@Body() ciudadsDto: CiudadDto[], @Param('supermercadoId') supermercadoId: string){
        const ciudads = plainToInstance(CiudadEntity, ciudadsDto)
        return await this.CiudadSupermercadoService.associateCiudadSupermercado(supermercadoId, ciudads);
    }
    
    @Delete(':supermercadoId/cities/:ciudadId')
    @HttpCode(204)
       async deleteCiudadSupermercado(@Param('supermercadoId') supermercadoId: string, @Param('ciudadId') ciudadId: string){
           return await this.CiudadSupermercadoService.deleteCiudadSupermercado(supermercadoId, ciudadId);
       }
}
