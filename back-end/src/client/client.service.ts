import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './create-client.dto';
import { UpdateClientDto } from './update-client.dto';
import { AdresseService } from './AdresseService';
import { Adresse } from './adress.entity';


@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    
    private readonly adresseService: AdresseService,
  ) {}

  // CREATE
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new Error('Client with this email already exists');
    }

    const client = this.clientRepository.create({
      nom: createClientDto.nom,
      prenom: createClientDto.prenom,
      email: createClientDto.email,
      telephone: createClientDto.telephone,
    });

    // Gestion des adresses
    const adresses: Adresse[] = [];

    if (createClientDto.adresses) {
      for (const adresseDto of createClientDto.adresses) {
        const adresse = await this.adresseService.createOrGetAdresse(adresseDto);
        adresses.push(adresse);
      }
    }

    client.adresses = adresses;

    return this.clientRepository.save(client);
  }

  // FIND ALL
  findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['adresses', 'orders'],
    });
  }

  // FIND ONE
  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['adresses', 'orders'],
    });

    if (!client) {
      throw new NotFoundException('Client non trouvé');
    }

    return client;
  }

  // UPDATE
  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['adresses'],
    });

    if (!client) {
      throw new NotFoundException('Client non trouvé');
    }

    // Mise à jour des champs
    client.nom = updateClientDto.nom ?? client.nom;
    client.prenom = updateClientDto.prenom ?? client.prenom;
    client.email = updateClientDto.email ?? client.email;
    client.telephone = updateClientDto.telephone ?? client.telephone;

    // Gestion des adresses
    if (updateClientDto.adresses) {
      const adresses: Adresse[] = [];

      for (const adresseDto of updateClientDto.adresses) {
        const adresse = await this.adresseService.createOrGetAdresse(adresseDto);
        adresses.push(adresse);
      }

      client.adresses = adresses;
    }

    return this.clientRepository.save(client);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const result = await this.clientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Client non trouvé');
    }
  }
  async bloquer(id: string): Promise<Client> {
  const client = await this.clientRepository.findOne({ where: { id } });
  if (!client) throw new NotFoundException('Client non trouvé');

  if (!client.isactive) throw new BadRequestException('Client déjà bloqué');

  client.isactive = false;
  return this.clientRepository.save(client);
}

async debloquer(id: string): Promise<Client> {
  const client = await this.clientRepository.findOne({ where: { id } });
  if (!client) throw new NotFoundException('Client non trouvé');

  if (client.isactive) throw new BadRequestException('Client déjà actif');

  client.isactive = true;
  return this.clientRepository.save(client);
}
}