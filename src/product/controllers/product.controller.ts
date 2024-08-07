import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') id) {
    const product = await this.productService.getProductById(id);
    if (product) {
      return product;
    }
    throw new NotFoundException('Product not found.');
  }

  @Post()
  async postProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.postProduct(createProductDto);
      return product;
    } catch (ex) {
      throw new InternalServerErrorException(ex.message);
    }
  }

  @Put(':id')
  async putProduct(@Param('id') id, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.putProduct(id, updateProductDto);
    if (product) {
      return product;
    }
    throw new NotFoundException('Product not found.');
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    const result = await this.productService.deleteProduct(id);
    if (result) {
      return null;
    }
    throw new NotFoundException('Product not found.');
  }
}
