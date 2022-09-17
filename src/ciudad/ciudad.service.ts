import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'
import { CiudadEntity } from '../ciudad/ciudad.entity';

@Injectable()
export class CiudadService {
    constructor(
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>    
    ){}

    //Obtener todas las ciudades
    async findAll(): Promise<CiudadEntity[]> {
        return await this.ciudadRepository.find({ relations: ["supermercados"] });
    }

    //Obtener una Ciudad por id
    async findOne(id: string): Promise<CiudadEntity> {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id}, relations: ["supermercados"] } );
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND);
   
        return ciudad;
    }

    //Crear una Ciudad
    async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
        return await this.ciudadRepository.save(ciudad);
    }

    //Actualizar una Ciudad por id
    async update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity> {
        const persistedCiudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id}});
        if (!persistedCiudad)
          throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND);
        
        return await this.ciudadRepository.save({...persistedCiudad, ...ciudad});
    }

    //Borrar una Ciudad
    async delete(id: string) {
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where:{id}});
        if (!ciudad)
          throw new BusinessLogicException("La ciudad con el id no fue encontrado", BusinessError.NOT_FOUND);
     
        await this.ciudadRepository.remove(ciudad);
    }
}
