import { Module } from '@nestjs/common';
import { UserEmbeddedService } from './user_embedded.service';
import { UserEmbeddedController } from './user_embedded.controller';
import { UserEmbedded, UserEmbeddedSchema } from './entities/user_embedded.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEmbedded.name, schema: UserEmbeddedSchema }]),],
  controllers: [UserEmbeddedController],
  providers: [UserEmbeddedService],
})
export class UserEmbeddedModule {}
