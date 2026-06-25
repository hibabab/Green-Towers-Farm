import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './product.entity';
import { ProduitsController } from './product.controller';
import { ProduitsService } from './product.service';

@Module({
   imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitsController],
  providers: [ProduitsService]
})
export class ProductModule {}
