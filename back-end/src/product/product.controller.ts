import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProduitsService } from './product.service';
import { CreateProduitDto } from './Createproduct.dto';
import { UpdateProduitDto } from './UpdateProductDto.dto';
import { Produit } from './product.entity';
import { Multer } from 'multer'; // ✅ import direct

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/produits',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() createProduitDto: CreateProduitDto,
    @UploadedFile() file: Multer.File, // ✅ plus Express.Multer.File
  ): Promise<Produit> {
    const imagePath = file ? file.path : null;
    createProduitDto.imageUrl = imagePath;
    return this.produitsService.create(createProduitDto);
  }

  @Get()
  findAll(): Promise<Produit[]> {
    return this.produitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Produit> {
    return this.produitsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/produits',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
    @UploadedFile() file: Multer.File, // ✅
  ): Promise<Produit> {
    const imagePath = file ? file.path : undefined;
    updateProduitDto.imageUrl = imagePath;
    return this.produitsService.update(id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.produitsService.remove(id);
  }
}