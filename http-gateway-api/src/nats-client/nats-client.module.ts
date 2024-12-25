import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'NATS_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.NATS,
                    options: {
                      servers: [`nats://${configService.get<string>('URL_NATS')}`],
                    },
                  }),
            },
        ]),
    ],
    exports: [ClientsModule],
})
export class NatsClientModule { }
