import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'
import { SupermercadoEntity } from './supermercado.entity';

@Injectable() 
export class SupermercadoService {
    constructor(
        @InjectRepository(SupermercadoEntity)
        private readonly supermercadoRepository: Repository<SupermercadoEntity>    
    ){}

    //Obtener todas los Supermercados
    async findAll(): Promise<SupermercadoEntity[]> {
        return await this.supermercadoRepository.find({ relations: ["ciudad"] });
    }

    //Obtener un Supermercado por id
    async findOne(id: string): Promise<SupermercadoEntity> {
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where: {id}, relations: ["ciudad"] } );
        if (!supermercado)
          throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND);
   
        return supermercado;
    }

    //Crear un Supermercado
    async create(supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
        return await this.supermercadoRepository.save(supermercado);
    }

    //Actualizar un Supermercado por id
    async update(id: string, supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
        const persistedSupermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where:{id}});
        if (!persistedSupermercado)
          throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND);
        
        return await this.supermercadoRepository.save({...persistedSupermercado, ...supermercado});
    }

    //Borrar un Supermercado
    async delete(id: string) {
        const supermercado: SupermercadoEntity = await this.supermercadoRepository.findOne({where:{id}});
        if (!supermercado)
          throw new BusinessLogicException("El supermercado con el id no fue encontrado", BusinessError.NOT_FOUND);
     
        await this.supermercadoRepository.remove(supermercado);
    }
}
