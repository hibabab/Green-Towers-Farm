import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrderLine } from './order-line.entity';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './oder.service';
import { Produit } from '../product/product.entity';
import { Client } from '../client/client.entity';
import { ClientsService } from '../client/client.service';
import { AdresseService } from '../client/AdresseService';
import { Adresse } from '../client/adress.entity';


@Module({
   imports: [TypeOrmModule.forFeature([OrderLine,Order,Produit,Client,Adresse])],
   providers:[OrdersService,ClientsService,AdresseService],
  controllers: [OrdersController]
})
export class OrderModule {}
