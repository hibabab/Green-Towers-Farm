import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Categorie } from './categorie.enum';


@Entity('produits')
export class Produit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nom!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  prix!: number;

  @Column({ default: 0 })
  stock!: number;

  @Column({ type: 'enum', enum: Categorie, nullable: true })
  categorie?: Categorie;

  @Column({ default: true })
  isNew!: boolean;

  @Column({ nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  creeLe!: Date;

  @UpdateDateColumn()
  modifieLe!: Date;

  @Column({ default: false })
  isDeleted!: boolean;

  @DeleteDateColumn()
  deleteLe?: Date;
}