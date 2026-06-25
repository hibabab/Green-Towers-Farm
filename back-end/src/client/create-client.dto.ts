import { IsString, IsEmail, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAdresseDto } from './CreateAdresseDto';

export class CreateClientDto {
  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  email: string;

  @IsString()
  telephone: string;

  
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdresseDto)
  adresses?: CreateAdresseDto[];
}