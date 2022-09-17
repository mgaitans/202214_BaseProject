import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CiudadEntity, Pais } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
import { faker } from '@faker-js/faker';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<CiudadEntity>;
  let ciudadesList: CiudadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CiudadService],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<CiudadEntity>>(getRepositoryToken(CiudadEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    ciudadesList = [];
    for(let i = 0; i < 5; i++){
      const ciudad: CiudadEntity = await repository.save({
        nombre: faker.lorem.word(),
        pais: Pais.ARGENTINA,
        habitantes: faker.lorem.paragraphs()
      })
      ciudadesList.push(ciudad);
    }
  }

  it('El servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('findAll debe retornar todos las ciudades', async () => {
    const ciudades: CiudadEntity[] = await service.findAll();
    expect(ciudades).not.toBeNull();
    expect(ciudades).toHaveLength(ciudadesList.length);
  });

  it('findOne debe devolver una ciudad por id', async () => {
    const storedCiudad: CiudadEntity = ciudadesList[0];
    const ciudad: CiudadEntity = await service.findOne(storedCiudad.id);
    expect(ciudad).not.toBeNull();
    expect(ciudad.nombre).toEqual(storedCiudad.nombre)
    expect(ciudad.pais).toEqual(storedCiudad.pais)
    expect(ciudad.habitantes).toEqual(storedCiudad.habitantes)
  });

  it('findOne debería lanzar una excepción para un museo inválido', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "La ciudad con el id no fue encontrado")
  });

  it('create debe retornar una nueva ciudad', async () => {
    const ciudad: CiudadEntity = {
      id: "",
      nombre: faker.lorem.word(),
      pais: Pais.ARGENTINA,
      habitantes: faker.lorem.sentence(),
      supermercados: []
    }

    const nuevoCiudad: CiudadEntity = await service.create(ciudad);
    expect(nuevoCiudad).not.toBeNull();
 
    const storedCiudad: CiudadEntity = await repository.findOne({where: {id: nuevoCiudad.id}})
    expect(storedCiudad).not.toBeNull();
    expect(ciudad.nombre).toEqual(storedCiudad.nombre)
    expect(ciudad.pais).toEqual(storedCiudad.pais)
    expect(ciudad.habitantes).toEqual(storedCiudad.habitantes)
  });

  it('update debe modificar una ciudad', async () => {
    const ciudad: CiudadEntity = ciudadesList[0];
    ciudad.nombre = "Nuevo nombre";
    ciudad.pais = Pais.ARGENTINA;
    ciudad.habitantes = "Nuevo numero de habitantes de una ciudad";
    const updatedCiudad: CiudadEntity = await service.update(ciudad.id, ciudad);
    expect(updatedCiudad).not.toBeNull();
    const storedCiudad: CiudadEntity = await repository.findOne({ where: { id: ciudad.id } })
    expect(storedCiudad).not.toBeNull();
    expect(storedCiudad.nombre).toEqual(ciudad.nombre)
    expect(storedCiudad.pais).toEqual(ciudad.pais)
    expect(storedCiudad.habitantes).toEqual(ciudad.habitantes)
  });

  it('update debe retornar una excepcion pora una ciudad invalida', async () => {
    let ciudad: CiudadEntity = ciudadesList[0];
    ciudad = {
      ...ciudad, nombre: "Nuevo nombre", habitantes: "Nuevo numero de habitantes de una ciudad"
    }
    await expect(() => service.update("0", ciudad)).rejects.toHaveProperty("message", "La ciudad con el id no fue encontrado")
  });

  it('delete debe remover una ciudad', async () => {
    const ciudad: CiudadEntity = ciudadesList[0];
    await service.delete(ciudad.id);
     const deletedCiudad: CiudadEntity = await repository.findOne({ where: { id: ciudad.id } })
    expect(deletedCiudad).toBeNull();
  });

  it('delete debe retornar una excepcion por una ciudad invalido', async () => {
    let ciudad: CiudadEntity = ciudadesList[0];
    await service.delete(ciudad.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "La ciudad con el id no fue encontrado")
  });
  
});
