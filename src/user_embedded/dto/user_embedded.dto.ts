import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductEmbeddedDto, UpdateProductEmbeddedDto } from './product-embedded.dto'

export class CreateUserEmbeddedDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: [CreateProductEmbeddedDto],
    description: 'Array of products owned by the user'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductEmbeddedDto)
  @IsOptional()
  products?: CreateProductEmbeddedDto[];
}


export class UpdateUserEmbeddedDto {
  @ApiPropertyOptional({
    example: 'Johnathan Doe',
    description: 'The updated name of the user'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'johnathan.doe@example.com',
    description: 'The updated email of the user'
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: [UpdateProductEmbeddedDto],
    description: 'Updated array of products owned by the user'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductEmbeddedDto)
  @IsOptional()
  products?: UpdateProductEmbeddedDto[];
}