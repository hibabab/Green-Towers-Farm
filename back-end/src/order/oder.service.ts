import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';

import { Client } from '../client/client.entity';
import { CreateOrderDto } from './create-order.dto';
import { OrderLine } from './order-line.entity';

import { Etat } from './etat.enums';
import { Produit } from '../product/product.entity';
import { ClientsService } from '../client/client.service';
import { CreateClientDto } from '../client/create-client.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderLine)
    private orderLineRepository: Repository<OrderLine>,

    @InjectRepository(Produit)
    private produitRepository: Repository<Produit>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
   private readonly clientsService: ClientsService
  ) {}

async create(createOrderDto: CreateOrderDto): Promise<Order> {
  // APRÈS
let client = await this.clientRepository.findOne({
  where: { email: createOrderDto.client.email },
  relations: ['adresses'],
});

if (!client) {
  client = await this.clientsService.create(createOrderDto.client);
} else {
  // Ajouter la nouvelle adresse au client existant si elle n'existe pas déjà
  if (createOrderDto.client.adresses?.length) {
    const nouvelleAdresse = createOrderDto.client.adresses[0];
    const dejaExiste = client.adresses?.some(
      (a) =>
        a.gouvernorat === nouvelleAdresse.gouvernorat &&
        a.ville === nouvelleAdresse.ville &&
        a.codePostal === nouvelleAdresse.codePostal &&
        a.rue === nouvelleAdresse.rue
    );
    if (!dejaExiste) {
      client = await this.clientsService.update(client.id, {
        adresses: [...(client.adresses || []), nouvelleAdresse],
      });
    }
  }
}
  // 1. Sauvegarder la commande d'abord pour avoir son ID
  const order = this.orderRepository.create({
    client,
    orderLines: [],
    total: 0,
    etat: Etat.EN_ATTENTE,
  });
  const savedOrder = await this.orderRepository.save(order);

  let total = 0;
  const orderLines: OrderLine[] = [];

  // 2. Créer les lignes avec référence à la commande sauvegardée
  for (const line of createOrderDto.orderLines) {
    const produit = await this.produitRepository.findOneBy({ id: line.produitId });
    if (!produit) throw new NotFoundException(`Produit ${line.produitId} non trouvé`);

    const prix = parseFloat(produit.prix as any); // ← fix: decimal string → number

    const orderLine = this.orderLineRepository.create({
      produit,
      quantite: line.quantite,
      prix,
      order: savedOrder, // ← lier à la commande sauvegardée
    });

    total += prix * line.quantite;
    orderLines.push(orderLine);
  }

  // 3. Sauvegarder les lignes séparément
  await this.orderLineRepository.save(orderLines);

  // 4. Mettre à jour le total
  savedOrder.total = total;
  return this.orderRepository.save(savedOrder);
}
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['orderLines','orderLines.produit']});
  }

  findOne(id: string): Promise<Order|null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['orderLines','orderLines.produit'],
    });
  }
  async accepter(id: string): Promise<Order> {
  const order = await this.orderRepository.findOne({
    where: { id },
    relations: ['orderLines', 'orderLines.produit'],
  });
  if (!order) throw new NotFoundException(`Commande ${id} non trouvée`);

  if (order.etat !== Etat.EN_ATTENTE) {
    throw new BadRequestException(`Impossible d'accepter une commande avec l'état: ${order.etat}`);
  }

  // Diminuer le stock pour chaque ligne
  for (const line of order.orderLines) {
    const produit = await this.produitRepository.findOneBy({ id: line.produit.id });
    if (!produit) throw new NotFoundException(`Produit ${line.produit.id} non trouvé`);

    if (produit.stock < line.quantite) {
      throw new BadRequestException(
        `Stock insuffisant pour le produit "${produit.nom}" (dispo: ${produit.stock}, demandé: ${line.quantite})`
      );
    }

    produit.stock -= line.quantite;
    await this.produitRepository.save(produit);
  }

  order.etat = Etat.EN_DE_PREPARATION;
  return this.orderRepository.save(order);
}

async annuler(id: string): Promise<Order> {
  const order = await this.orderRepository.findOne({ where: { id } });
  if (!order) throw new NotFoundException(`Commande ${id} non trouvée`);

  if (order.etat === Etat.ANNULE) {
    throw new BadRequestException('La commande est déjà annulée');
  }

  order.etat = Etat.ANNULE;
  return this.orderRepository.save(order);
}
}