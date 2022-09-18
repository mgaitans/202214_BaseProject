import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';

export enum Pais {
    ARGENTINA = "Argentina",
    ECUADOR   = "Ecuador",
    PARAGUAY  = "Paraguay"
}

@Entity()
export class CiudadEntity {
  static save(arg0: { nombre: string; pais: Pais; habitantes: number; }): CiudadEntity | PromiseLike<CiudadEntity> {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;
  
  @Column({
      type: 'simple-enum',
      enum: Pais
    })
    pais: Pais

  @Column()
  habitantes: number;
  
  @ManyToMany(()=> SupermercadoEntity, supermercado => supermercado.ciudad)
  @JoinTable()
  supermercados: SupermercadoEntity[];


}
