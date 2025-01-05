import { Module, Global } from '@nestjs/common';
import { AuthsModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ContactMailerModule } from './contact-mailer/contact-mailer.module';
import { CoursesModule } from './courses/courses.module';
@Global()
@Module({
  imports: [AuthsModule, PaymentsModule, UsersModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        expandVariables: true,
        envFilePath: '.env.development.local'
      }
    ), NatsClientModule,
    ContactMailerModule,
    CoursesModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
