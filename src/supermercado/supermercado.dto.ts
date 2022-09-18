import {IsNotEmpty, IsString, IsUrl, IsNumber, Length} from 'class-validator';
import { Url } from 'url';
export class SupermercadoDto {

 @IsString()
 @IsNotEmpty() 
 @Length(10, 50)
 readonly nombre: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly longitud: number;
 
 @IsNumber()
 @IsNotEmpty()
 readonly latitud : number;
 
 @IsUrl()
 @IsNotEmpty()
 readonly paginaweb: Url;
 
}
