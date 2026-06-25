import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('adresses')
export class Adresse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gouvernorat: string;

  @Column()
  ville: string;

  @Column()
  codePostal: string;

  @Column()
  rue: string;
}