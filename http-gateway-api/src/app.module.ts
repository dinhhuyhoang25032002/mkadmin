import { Module, Global } from '@nestjs/common';
import { AuthsModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ContactMailerModule } from './contact-mailer/contact-mailer.module';
import { CoursesModule } from './courses/courses.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [AuthsModule, PaymentsModule, UsersModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        expandVariables: true,
        envFilePath: '.env'
      }
    ), NatsClientModule,
    ContactMailerModule,
    CoursesModule, ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 1000,
    }]),],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
