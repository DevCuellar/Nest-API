import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products: ProductDto[] = await this.productRepository.find();
    return products;
  }

  async getProductById(id: number): Promise<ProductDto | null> {
    const product: ProductDto = await this.productRepository.findOne({ where: { id } });
    return product;
  }

  async postProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const newProduct = this.productRepository.create(createProductDto);
    const product = await this.productRepository.save(newProduct);
    return product;
  }

  async putProduct(id: number, updateProductDto: UpdateProductDto): Promise<ProductDto | null> {
    // Option 1
    // const product = this.productRepository.create(updateProductDto);
    // const result = await this.productRepository.update({ id }, product);
    // if (!result.affected) {
    //   return null;
    // }
    // return await this.getProductById(id);

    // Option 2
    const updatedProduct = await this.getProductById(id);
    if (!updatedProduct) {
      return null;
    }
    Object.assign(updatedProduct, updateProductDto);
    const product = await this.productRepository.save(updatedProduct);
    return product;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.productRepository.delete({ id });
    return result.affected > 0;
  }
}
