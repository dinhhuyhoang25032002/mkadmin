import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NATS_SERVICE',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://nats'],
                },
            },
        ]),
    ],
    exports: [
        ClientsModule.register([
            {
                name: 'NatsClientModule',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://nats'],
                },
            },
        ]),
    ],
})
export class NatsClientModule { }
