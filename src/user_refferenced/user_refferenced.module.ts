import { Module } from '@nestjs/common';
import { UserRefferencedController } from './user_refferenced.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { UserReferenced, UserReferencedSchema } from './entities/user_refferenced.entity'
import { Product, ProductSchema } from './entities/product_refferenced.entity'
import { UsersService } from './user_refferenced.service'
import { ProductsService } from './product.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserReferenced.name, schema: UserReferencedSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [UserRefferencedController],
  providers: [UsersService, ProductsService],
})
export class UserRefferencedModule {}
