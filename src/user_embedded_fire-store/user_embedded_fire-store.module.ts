import { Module } from '@nestjs/common';
import { UserEmbeddedFireStoreController } from './user_embedded_fire-store.controller';
import { UserEmbeddedFireStoreService } from './user_embedded_fire-store.service';
import { Firestore } from '@google-cloud/firestore';
import { FirebaseModule } from 'src/fire-store-module/fire-store-module.module';

@Module({
  controllers: [UserEmbeddedFireStoreController],
  providers: [UserEmbeddedFireStoreService],
  imports: [FirebaseModule],
})
export class UserEmbeddedFireStoreModule {}
