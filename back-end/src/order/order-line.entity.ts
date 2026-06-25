import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { Order } from './order.entity';
import { Produit } from '../product/product.entity';


@Entity('order_lines')
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 

  @ManyToOne(() => Produit, { eager: true })
  produit: Produit;

  @Column()
  quantite: number;

  @Column()
  prix: number;
   @ManyToOne(() => Order, order => order.orderLines) // propriété inverse
  order: Order;
}