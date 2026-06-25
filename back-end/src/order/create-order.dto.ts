import { IsUUID, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderLineDto } from './create-order-line.dto';
import { CreateClientDto } from '../client/create-client.dto';
export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CreateClientDto)   
  client: CreateClientDto
   
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  orderLines: CreateOrderLineDto[];
}