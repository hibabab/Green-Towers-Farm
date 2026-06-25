import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './product.entity';
import { CreateProduitDto } from './Createproduct.dto';
import { UpdateProduitDto } from './UpdateProductDto.dto';




@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
   
   
  ) {}

  // CREATE
  async create(createProduitDto: CreateProduitDto): Promise<Produit> {

    const produit = this.produitRepository.create(createProduitDto);
    return await this.produitRepository.save(produit);
  }

  // READ ALL
  findAll(): Promise<Produit[]> {
    return this.produitRepository.find();
  }

  // READ ONE
  async findOne(id: string): Promise<Produit> {
    const produit = await this.produitRepository.findOneBy({ id });
    if (!produit) throw new NotFoundException(`Produit avec id ${id} non trouvé`);
    return produit;
  }

  // UPDATE
  async update(id: string, updateProduitDto: UpdateProduitDto): Promise<Produit> {
    const produit = await this.produitRepository.preload({
      id,
      ...updateProduitDto,
    });

    if (!produit) throw new NotFoundException(`Produit avec id ${id} non trouvé`);

    return this.produitRepository.save(produit);
  }

 
  async remove(id: string): Promise<void> {
  
  const produit = await this.produitRepository.findOneBy({ id });

  if (!produit) {
    throw new Error('Produit non trouvé');
  }

  produit.isDeleted = true;

 
  await this.produitRepository.save(produit);
}
}