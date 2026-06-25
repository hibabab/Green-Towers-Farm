import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, Column } from 'typeorm';
import { Client } from '../client/client.entity';
import { OrderLine } from './order-line.entity';

import { Etat } from './etat.enums';


@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  client: Client;
   @OneToMany(() => OrderLine, orderLine => orderLine.order, { cascade: true })
  orderLines: OrderLine[];

  @Column({ default: 0 })
  total: number;
  @Column({ type: 'enum', enum: Etat, nullable: true })
  etat: Etat;

  @CreateDateColumn()
  dateCommande: Date;
}