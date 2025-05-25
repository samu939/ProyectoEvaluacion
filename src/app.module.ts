import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEmbeddedModule } from './user_embedded/user_embedded.module';
import { UserRefferencedModule } from './user_refferenced/user_refferenced.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Firestore } from '@google-cloud/firestore';
import { UserEmbeddedFireStoreModule } from './user_embedded_fire-store/user_embedded_fire-store.module'
import { FirebaseModule } from './fire-store-module/fire-store-module.module'
import { ReferencedUserFireStoreModule } from './referenced_user_fire-store/referenced_user_fire-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB!, {
      dbName: 'evaluacion_sistemas',
    }),
    UserEmbeddedModule,
    UserRefferencedModule,
    UserEmbeddedFireStoreModule,
    FirebaseModule,
    ReferencedUserFireStoreModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
