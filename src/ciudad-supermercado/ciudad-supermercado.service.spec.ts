import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CiudadEntity, Pais } from '../ciudad/ciudad.entity';
import { SupermercadoEntity } from '../supermercado/supermercado.entity'; 
import { CiudadSupermercadoService } from './ciudad-supermercado.service'; 


describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService; 
  let ciudadRepository: Repository<CiudadEntity>;
  let supermercadoRepository: Repository<SupermercadoEntity>;
  let supermercado: SupermercadoEntity;  
  let ciudadList: CiudadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadSupermercadoService],
    }).compile();

    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
    ciudadRepository = module.get<Repository<CiudadEntity>>(getRepositoryToken(CiudadEntity));
    supermercadoRepository = module.get<Repository<SupermercadoEntity>>(getRepositoryToken(SupermercadoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    ciudadRepository.clear();
    supermercadoRepository.clear();
    
    ciudadList = [];
    for(let i = 0; i < 5; i++){
      const ciudad: CiudadEntity = await CiudadEntity.save({
        nombre: faker.address.country(),
        pais: Pais.ARGENTINA,
        habitantes: parseInt(faker.random.numeric())
      })
      ciudadList.push(ciudad);
    }

    supermercado = await supermercadoRepository.save({
      nombre: faker.lorem.word(),
      longitud: parseInt(faker.random.numeric()),
      latitud: parseInt(faker.random.numeric()),
      paginaweb: faker.internet.url(),
      ciudad: ciudadList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

