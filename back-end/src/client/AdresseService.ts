import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adresse } from './adress.entity';
import { CreateAdresseDto } from './CreateAdresseDto';

@Injectable()
export class AdresseService {
  constructor(
    @InjectRepository(Adresse)
    private readonly adresseRepository: Repository<Adresse>,
  ) {}

  async createOrGetAdresse(createAdresseDto: CreateAdresseDto): Promise<Adresse> {
    const existingAdresse = await this.adresseRepository.findOne({
      where: {
        gouvernorat: createAdresseDto.gouvernorat,
        ville: createAdresseDto.ville,
        codePostal: createAdresseDto.codePostal,
        rue: createAdresseDto.rue,
      },
    });

    if (existingAdresse) return existingAdresse;

    const adresse = this.adresseRepository.create(createAdresseDto);
    return this.adresseRepository.save(adresse);
  }
}