import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';

import { CreateOrderDto } from './create-order.dto';
import { Order } from './order.entity';
import { OrdersService } from './oder.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order|null> {
    return this.ordersService.findOne(id);
  }
  @Patch(':id/accepter')
accepter(@Param('id') id: string) {
  return this.ordersService.accepter(id);
}

@Patch(':id/annuler')
annuler(@Param('id') id: string) {
  return this.ordersService.annuler(id);
}
}