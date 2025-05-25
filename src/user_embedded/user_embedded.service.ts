import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserEmbeddedDto,
  UpdateUserEmbeddedDto,
} from './dto/user_embedded.dto';
import { UserEmbedded } from './entities/user_embedded.entity';

@Injectable()
export class UserEmbeddedService {
  constructor(
    @InjectModel(UserEmbedded.name)
    private userEmbeddedModel: Model<UserEmbedded>,
  ) {}

  async create(createUserEmbeddedDto: CreateUserEmbeddedDto) {
    const createdUser = new this.userEmbeddedModel(createUserEmbeddedDto);
    return createdUser.save({});
  }

  async findAll() {
    return this.userEmbeddedModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userEmbeddedModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`UserEmbedded with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserEmbeddedDto: UpdateUserEmbeddedDto) {
    const updatedUser = await this.userEmbeddedModel
      .findByIdAndUpdate(id, updateUserEmbeddedDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`UserEmbedded with id ${id} not found`);
    }
    return updatedUser;
  }

  async deleteProduct(id: string, product: string) {
    const updatedUser = await this.userEmbeddedModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          products: { name: product },
        },
      },
      { new: true }, // Return the updated document
    );
    if (!updatedUser) {
      throw new NotFoundException(`UserEmbedded with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userEmbeddedModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedUser) {
      throw new NotFoundException(`UserEmbedded with id ${id} not found`);
    }
    return deletedUser;
  }
}
