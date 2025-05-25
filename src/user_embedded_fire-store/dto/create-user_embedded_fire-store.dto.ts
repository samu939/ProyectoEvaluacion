import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProductEmbeddedDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

}

export class CreateEmbeddedUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: [ProductEmbeddedDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductEmbeddedDto)
  products: ProductEmbeddedDto[];
}