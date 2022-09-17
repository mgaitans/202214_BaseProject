import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';

export enum Pais {
    ARGENTINA = "Argentina",
    ECUADOR   = "Ecuador",
    PARAGUAY  = "Paraguay"
}

@Entity()
export class CiudadEntity {
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
 habitantes: string;

 @ManyToMany(() => SupermercadoEntity, supermercado => supermercado.ciudad)
 @JoinTable()
 supermercados: SupermercadoEntity[];

}
