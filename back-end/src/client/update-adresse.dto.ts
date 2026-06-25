import { PartialType } from "@nestjs/mapped-types";
import { CreateAdresseDto } from "./CreateAdresseDto";

export class UpdateClientDto extends PartialType(CreateAdresseDto) {}