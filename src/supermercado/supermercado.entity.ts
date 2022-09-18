import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Url } from 'url';
import { CiudadEntity } from '../ciudad/ciudad.entity';

@Entity()
export class SupermercadoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
  
  @Column()
  longitud: number;
  
  @Column()
  latitud : number;
  
  @Column()
  paginaweb: string;

  @ManyToMany(()=> CiudadEntity, ciudad => ciudad.supermercados)
  @JoinTable()
  ciudad: CiudadEntity[];

}
