import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_MODEL, UserSchema } from 'src/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NODEIOT_MODEL, NodeIotSchema } from 'src/schemas/nodeiot.schema';
@Module({
  imports:[ MongooseModule.forFeature([
    {
      name: USER_MODEL,
      schema: UserSchema,
    },
    {
      name: NODEIOT_MODEL,
      schema: NodeIotSchema,
    },
  ]),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
