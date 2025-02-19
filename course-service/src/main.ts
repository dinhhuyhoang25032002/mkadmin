import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.URL_NATS}`]
    }
  });
  await app.listen().then(() => console.log('Connect NATS successfully!'));
}
bootstrap();
