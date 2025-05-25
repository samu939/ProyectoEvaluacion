import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product_refferenced.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().select('-__v').exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).select('-__v').exec();
  }

  async findOneByName(name: string): Promise<Product> {
    return this.productModel.findOne({ name }).select('-__v').exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .select('-__v')
      .exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}