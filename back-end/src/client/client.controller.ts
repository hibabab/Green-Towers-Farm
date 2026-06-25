import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';

import { CreateClientDto } from './create-client.dto';
import { UpdateClientDto } from './update-client.dto';
import { Client } from './client.entity';
import { ClientsService } from './client.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientsService.remove(id);
  }

  @Patch(':id/bloquer')
  bloquer(@Param('id') id: string): Promise<Client> {
    return this.clientsService.bloquer(id);
  }

  @Patch(':id/debloquer')
  debloquer(@Param('id') id: string): Promise<Client> {
    return this.clientsService.debloquer(id);
  }
}