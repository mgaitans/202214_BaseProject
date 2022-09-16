import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
