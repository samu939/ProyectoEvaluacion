import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserReferenced } from './entities/user_refferenced.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ProductsService } from './product.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserReferenced.name) private userModel: Model<UserReferenced>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserReferenced> {
    const createdUser = new this.userModel({
      ...createUserDto,
      products: createUserDto.productIds?.map(id => new Types.ObjectId(id)) || [],
    });
    return createdUser.save();
  }

  async findAll(): Promise<UserReferenced[]> {
    return this.userModel.find()
      .populate({
        path: 'products',
        select: '-__v' // Exclude version key from populated products
      })
      .select('-__v') // Exclude version key from users
      .exec();
  }

  async findOne(id: string): Promise<UserReferenced> {
    return this.userModel.findById(id)
      .populate({
        path: 'products',
        select: '-__v' // Exclude version key from populated products
      })
      .select('-__v') // Exclude version key from UserReferenced
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserReferenced> {
    const updateData: any = { ...updateUserDto };
    
    if (updateUserDto.productIds) {
      updateData.products = updateUserDto.productIds.map(id => new Types.ObjectId(id));
    }

    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: 'products',
        select: '-__v'
      })
      .select('-__v')
      .exec();
  }

  async remove(id: string): Promise<UserReferenced> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async removeProductFromUserByName(userId: string, productName: string): Promise<UserReferenced> {
    // Find the product by name to get its ID
    const product = await this.productsService.findOneByName(productName);
    
    if (!product) {
      throw new Error('Product not found');
    }

    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { products: product._id } },
        { new: true },
      )
      .populate({
        path: 'products',
        select: '-__v'
      })
      .select('-__v')
      .exec();
  }
}