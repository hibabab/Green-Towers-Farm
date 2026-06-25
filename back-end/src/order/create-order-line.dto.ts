import { IsUUID, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateOrderLineDto {
  @IsUUID()
  produitId: string;

  @IsNumber()
  @Min(1)
  quantite: number;
}