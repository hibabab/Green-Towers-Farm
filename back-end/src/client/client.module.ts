import { Module } from '@nestjs/common';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adresse } from './adress.entity';
import { AdresseService } from './AdresseService';

@Module({
  imports: [TypeOrmModule.forFeature([Client,Adresse])],
  controllers: [ClientsController],
  providers: [ClientsService,AdresseService]
})
export class ClientModule {}
