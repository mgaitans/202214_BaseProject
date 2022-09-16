import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
