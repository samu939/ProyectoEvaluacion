import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEmbeddedService } from './user_embedded.service';
import { CreateUserEmbeddedDto, UpdateUserEmbeddedDto } from './dto/user_embedded.dto'

@Controller('user-embedded')
export class UserEmbeddedController {
  constructor(private readonly userEmbeddedService: UserEmbeddedService) {}

  @Post()
  create(@Body() createUserEmbeddedDto: CreateUserEmbeddedDto) {
    return this.userEmbeddedService.create(createUserEmbeddedDto);
  }

  @Get()
  findAll() {
    return this.userEmbeddedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEmbeddedService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserEmbeddedDto: UpdateUserEmbeddedDto) {
    return this.userEmbeddedService.update(id, updateUserEmbeddedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEmbeddedService.remove(id);
  }

  @Patch('product/:id')
  removeProduct(@Param('id') id: string, @Body() product: {product: string}) {
    return this.userEmbeddedService.deleteProduct(id, product.product);
  }
}
