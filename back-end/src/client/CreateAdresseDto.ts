import { IsString, IsNotEmpty} from 'class-validator';

export class CreateAdresseDto {
  @IsString()
  @IsNotEmpty()
  gouvernorat: string;

  @IsString()
  @IsNotEmpty()
  ville: string;

  @IsString()
  @IsNotEmpty()
  codePostal: string;

  @IsString()
  @IsNotEmpty()
  rue: string;
}