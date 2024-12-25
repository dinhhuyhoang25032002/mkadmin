import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { NODEIOT_MODEL, NodeIotSchema } from '@schemas/nodeiot.schema';

@Module({
  imports: [NatsClientModule, MongooseModule.forFeature([
    {
      name: USER_MODEL,
      schema: UserSchema
    }, {
      name: NODEIOT_MODEL,
      schema: NodeIotSchema
    }
  ])],
  controllers: [AuthsController],
  providers: [AuthsService,]
})
export class AuthsModule { }
