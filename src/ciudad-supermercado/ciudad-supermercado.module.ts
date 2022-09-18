import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { SupermercadoService } from '../supermercado/supermercado.service';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';

@Module({
 imports: [TypeOrmModule.forFeature([CiudadEntity, SupermercadoEntity])],
 providers: [CiudadSupermercadoService, CiudadService, SupermercadoService]
 /*,controllers: [CiudadController]*/
})
export class CiudadModule {}


 

@Module({
  providers: [CiudadSupermercadoService]
})
export class CiudadSupermercadoModule {}
