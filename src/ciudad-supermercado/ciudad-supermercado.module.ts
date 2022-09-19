import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { SupermercadoController } from '../supermercado/supermercado.controller';
import { CiudadService } from '../ciudad/ciudad.service';
import { CiudadController } from '../ciudad/ciudad.controller';
import { SupermercadoService } from '../supermercado/supermercado.service';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';

@Module({
 imports: [TypeOrmModule.forFeature([CiudadEntity, SupermercadoEntity])],
 providers: [CiudadSupermercadoService, CiudadService, SupermercadoService],
 controllers: [CiudadSupermercadoController, CiudadController, SupermercadoController] 
})

export class CiudadSupermercadoModule {}
