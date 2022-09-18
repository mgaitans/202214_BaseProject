import {IsNotEmpty, IsString, IsUrl, IsNumber} from 'class-validator';
export class SupermercadoDto {

 @IsString()
 @IsNotEmpty()
 readonly nombre: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly longitud: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly latitud : string;
 
 @IsUrl()
 @IsNotEmpty()
 readonly paginaweb: string;
 
}
