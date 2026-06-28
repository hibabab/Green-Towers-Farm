import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, Min, IsPositive, IsEnum } from 'class-validator';
import { Categorie } from './categorie.enum';

export class CreateProduitDto {
  @IsString()
  nom: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsPositive()
  prix: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  stock: number;

  @IsEnum(Categorie)
  categorie: Categorie;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}