import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Order } from '../order/order.entity';
import { Adresse } from './adress.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;

  @Column({ default: true })
  isactive: boolean;

  @CreateDateColumn()
  creeLe: Date;

  @UpdateDateColumn()
  modifieLe: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  // Relation unidirectionnelle via ManyToMany
  @ManyToMany(() => Adresse)
  @JoinTable()
  adresses: Adresse[];
}