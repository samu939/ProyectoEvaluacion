import { PartialType } from '@nestjs/swagger';
import { CreateEmbeddedUserDto } from './create-user_embedded_fire-store.dto'

export class UpdateUserEmbeddedFireStoreDto extends PartialType(CreateEmbeddedUserDto) {}
