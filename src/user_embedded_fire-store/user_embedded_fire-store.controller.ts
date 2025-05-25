import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { CreateEmbeddedUserDto } from './dto/create-user_embedded_fire-store.dto'
import { UpdateUserEmbeddedFireStoreDto } from './dto/update-user_embedded_fire-store.dto'
import { UserEmbeddedFireStoreService } from './user_embedded_fire-store.service'

@Controller('embedded-users-fire-store')
export class UserEmbeddedFireStoreController {
  constructor(private readonly usersService: UserEmbeddedFireStoreService) {}

  @Post()
  create(@Body() createUserDto: CreateEmbeddedUserDto) {
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserEmbeddedFireStoreDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':userId/products/name/:productName')
  removeProductByName(
    @Param('userId') userId: string,
    @Param('productName') productName: string,
  ) {
    return this.usersService.removeProductByName(userId, productName);
  }

  @Post('seed')
  async seed(){
    return await this.usersService.seed();
  }

}