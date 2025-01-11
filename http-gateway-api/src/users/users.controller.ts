
import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Patch, Put, Query, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PartialUser } from 'src/users/class/User.class';
@Controller('users')
export class UsersController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }
    @Patch('add-value')
    @HttpCode(HttpStatus.OK)
    async addValue(@Body() info: { temperature: string, humidy: string, light: string, nodeId: string }) {
       // console.log(info);
        
        return this.natsClient.send('handleAddValue', info);

    }
    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUserInfo(@Body() info: PartialUser) {
        return this.natsClient.send('handleUpdateUserInfo', info);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getUserInfo(@Query() userId: string) {
        return this.natsClient.send('handleGetUserInfo', userId)
    }
}
