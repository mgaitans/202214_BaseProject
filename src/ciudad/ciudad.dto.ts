import {IsNotEmpty, IsString, IsNumber, IsEnum} from 'class-validator';

export enum Pais {
    ARGENTINA = "Argentina",
    ECUADOR   = "Ecuador",
    PARAGUAY  = "Paraguay"
}

export class CiudadDto {    

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
 @IsEnum(Pais)
 readonly pais: Pais;
 
 @IsNumber()
 @IsNotEmpty()
 readonly habitantes: number;
 
}
