import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SupermercadoEntity } from './supermercado.entity';
import { SupermercadoService } from './supermercado.service';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { faker } from '@faker-js/faker';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<SupermercadoEntity>;
  let supermercadosList: SupermercadoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SupermercadoService],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<SupermercadoEntity>>(getRepositoryToken(SupermercadoEntity));
    await seedDatabase();    
  });

  const seedDatabase = async () => {
    repository.clear();
    supermercadosList = [];
    for(let i = 0; i < 5; i++){
      const supermercado: SupermercadoEntity = await repository.save({
        nombre: faker.lorem.word(),
        longitud: faker.lorem.word(),
        latitud: faker.lorem.paragraphs(),
        paginaweb: faker.lorem.paragraphs()
      })
      supermercadosList.push(supermercado);
    }
  }

  it('El servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('findAll debe retornar todos los supermercados', async () => {
    const supermercados: SupermercadoEntity[] = await service.findAll();
    expect(supermercados).not.toBeNull();
    expect(supermercados).toHaveLength(supermercadosList.length);
  });

  it('findOne debe devolver un supermercado por id', async () => {
    const storedSupermercado: SupermercadoEntity = supermercadosList[0];
    const supermercado: SupermercadoEntity = await service.findOne(storedSupermercado.id);
    expect(supermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedSupermercado.nombre)
    expect(supermercado.longitud).toEqual(storedSupermercado.longitud)
    expect(supermercado.latitud).toEqual(storedSupermercado.latitud)    
    expect(supermercado.paginaweb).toEqual(storedSupermercado.paginaweb)
  });

  it('findOne debería lanzar una excepción para un supermercado inválido', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "El supermercado con el id no fue encontrado")
  });

  it('create debe retornar un nuevo supermercado', async () => {
    const supermercado: SupermercadoEntity = {
      id: "",
      nombre: faker.lorem.word(),
      longitud: faker.lorem.word(),
      latitud: faker.lorem.paragraphs(),
      paginaweb: faker.lorem.paragraphs(),
      ciudad: []
    }

    const nuevoSupermercado: SupermercadoEntity = await service.create(supermercado);
    expect(nuevoSupermercado).not.toBeNull();
 
    const storedSupermercado: SupermercadoEntity = await repository.findOne({where: {id: nuevoSupermercado.id}})
    expect(storedSupermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedSupermercado.nombre)
    expect(supermercado.longitud).toEqual(storedSupermercado.longitud)
    expect(supermercado.latitud).toEqual(storedSupermercado.latitud)    
    expect(supermercado.paginaweb).toEqual(storedSupermercado.paginaweb)
  });

  it('update debe modificar un supermercado', async () => {
    const supermercado: SupermercadoEntity = supermercadosList[0];
    supermercado.nombre = "Nuevo nombre";
    supermercado.longitud = "Nueva longitud";
    supermercado.latitud = "Nueva latitud";
    supermercado.paginaweb = "Nueva paginaweb";
    const updatedSupermercado: SupermercadoEntity = await service.update(supermercado.id, supermercado);
    expect(updatedSupermercado).not.toBeNull();
    const storedSupermercado: SupermercadoEntity = await repository.findOne({ where: { id: supermercado.id } })
    expect(storedSupermercado).not.toBeNull();
    expect(storedSupermercado.nombre).toEqual(supermercado.nombre)
    expect(storedSupermercado.longitud).toEqual(supermercado.longitud)
    expect(storedSupermercado.latitud).toEqual(supermercado.latitud)
    expect(storedSupermercado.paginaweb).toEqual(supermercado.paginaweb)
  });

  it('update debe retornar una excepcion pora un supermercado invalida', async () => {
    let supermercado: SupermercadoEntity = supermercadosList[0];
    supermercado = {
      ...supermercado, nombre: "Nuevo nombre", longitud: "Nueva longitud de un supermercado"
    }
    await expect(() => service.update("0", supermercado)).rejects.toHaveProperty("message", "El supermercado con el id no fue encontrado")
  });

  it('delete debe remover un supermercado', async () => {
    const supermercado: SupermercadoEntity = supermercadosList[0];
    await service.delete(supermercado.id);
     const deletedSupermercado: SupermercadoEntity = await repository.findOne({ where: { id: supermercado.id } })
    expect(deletedSupermercado).toBeNull();
  });

  it('delete debe retornar una excepcion por un supermercado invalido', async () => {
    let supermercado: SupermercadoEntity = supermercadosList[0];
    await service.delete(supermercado.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El supermercado con el id no fue encontrado")
  });
 

});
