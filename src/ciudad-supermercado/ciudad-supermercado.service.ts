import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class CiudadSupermercadoService {
    constructor(
      @InjectRepository(SupermercadoEntity)
      private readonly supermercadoRepository: Repository<SupermercadoEntity>,
      
      @InjectRepository(CiudadEntity)
      private readonly ciudadRepository: Repository<CiudadEntity>
    ) {}

    async addCiudadSupermercado(supermercadoId: string, ciudadId: string): Promise<SupermercadoEntity> {
      const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
      if (!ciudad)
        throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND);
    
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id: supermercadoId}, relations: ["ciudad"]})
      if (!supermercado)
        throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND);
  
        supermercado.ciudad = [...supermercado.ciudad, ciudad];
      return await this.supermercadoRepository.save(supermercado);
    }
    
    async findCiudadBySupermercadoIdCiudadId(supermercadoId: string, ciudadId: string): Promise<CiudadEntity> {
      const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
      if (!ciudad)
        throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND)
     
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id: supermercadoId}, relations: ["ciudad"]});
      if (!supermercado)
        throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND)
 
      const supermercadoCiudad: CiudadEntity = supermercado.ciudad.find(e => e.id === ciudad.id);
 
      if (!supermercadoCiudad)
        throw new BusinessLogicException("La ciudad con el identificador especificado no esta asociado al supermercado", BusinessError.PRECONDITION_FAILED)
 
      return supermercadoCiudad;
    }
    
    async findCiudadesBySupermercadoId(supermercadoId: string): Promise<CiudadEntity[]> {
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id: supermercadoId}, relations: ["ciudad"]});
      if (!supermercado)
        throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND)
     
      return supermercado.ciudad;
    }

    async associateCiudadSupermercado(supermercadoId: string, ciudad: CiudadEntity[]): Promise<SupermercadoEntity> {
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id: supermercadoId}, relations: ["ciudad"]});
  
      if (!supermercado)
        throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND)
  
      for (let i = 0; i < ciudad.length; i++) {
        const ciudades: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudad[i].id}});
        if (!ciudades)
          throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND)
      }
  
      supermercado.ciudad = ciudad;
      return await this.supermercadoRepository.save(supermercado);
    }

    async deleteCiudadSupermercado(supermercadoId: string, ciudadId: string){
      const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id: ciudadId}});
      if (!ciudad)
        throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND)
  
      const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id: supermercadoId}, relations: ["ciudad"]});
      if (!supermercado)
        throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND)
  
      const supermercadoCiudad: CiudadEntity = supermercado.ciudad.find(e => e.id === ciudad.id);
  
      if (!supermercadoCiudad)
          throw new BusinessLogicException("La ciudad con el identificador especificado no esta asociado al supermercado", BusinessError.PRECONDITION_FAILED)

          supermercado.ciudad = supermercado.ciudad.filter(e => e.id !== ciudadId);
      await this.supermercadoRepository.save(supermercado);
  }  

}
