import { IsString, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';
import { CreateProduitDto } from './Createproduct.dto';
import { PartialType } from '@nestjs/mapped-types';


export class UpdateProduitDto extends PartialType(CreateProduitDto) {}