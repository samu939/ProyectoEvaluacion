import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ReferencedProductsService } from './products.service';
import { ReferencedUser } from './entities/referenced_user_fire-store.entity'
import { ReferencedUserFireStoreService } from './referenced_user_fire-store.service'

@Controller('referenced-users')
export class ReferencedUserFireStoreController {
  constructor(
    private readonly usersService: ReferencedUserFireStoreService,
    private readonly productsService: ReferencedProductsService,
  ) {}

  @Post()
  create(@Body() createUserDto: Omit<ReferencedUser, 'id' | 'productRefs'>) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':userId/products/name/:productName')
  removeProductByName(
    @Param('userId') userId: string,
    @Param('productName') productName: string,
  ) {
    return this.usersService.removeProductByName(userId, productName);
  }

  @Post('seed')
  seed(){
    return this.usersService.seed()
  }

}