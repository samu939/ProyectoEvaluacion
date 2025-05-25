import { Module } from '@nestjs/common';
import { ReferencedUserFireStoreService } from './referenced_user_fire-store.service';
import { ReferencedUserFireStoreController } from './referenced_user_fire-store.controller';
import { FirebaseModule } from 'src/fire-store-module/fire-store-module.module'
import { ReferencedProductsService } from './products.service'

@Module({
  controllers: [ReferencedUserFireStoreController],
  providers: [ReferencedUserFireStoreService, ReferencedProductsService],
  imports: [FirebaseModule]
})
export class ReferencedUserFireStoreModule {}
