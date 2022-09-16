import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';

@Entity()
export class SupermercadoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 name: string;
 
 @Column()
 longitud: string;
 
 @Column()
 latitud : string;
 
 @Column()
 paginaweb: string;

 @ManyToOne(() => CiudadEntity, ciudad => ciudad.supermercados)
 ciudad: CiudadEntity;

}
