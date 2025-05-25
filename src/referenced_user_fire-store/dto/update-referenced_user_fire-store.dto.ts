import { PartialType } from '@nestjs/swagger';
import { CreateReferencedUserFireStoreDto } from './create-referenced_user_fire-store.dto';

export class UpdateReferencedUserFireStoreDto extends PartialType(CreateReferencedUserFireStoreDto) {}
