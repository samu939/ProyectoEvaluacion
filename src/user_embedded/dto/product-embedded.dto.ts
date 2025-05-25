import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductEmbeddedDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'The name of the product',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 999.99,
    description: 'The price of the product',
    required: true
  })
  @IsNumber()
  price: number;

}


export class UpdateProductEmbeddedDto {
  @ApiPropertyOptional({
    example: 'Premium Laptop',
    description: 'The updated name of the product'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 1099.99,
    description: 'The updated price of the product'
  })
  @IsNumber()
  @IsOptional()
  price?: number;

}