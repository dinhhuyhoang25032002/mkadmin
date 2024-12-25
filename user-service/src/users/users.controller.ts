import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @EventPattern('handleAddValue')
    async handleAddValue(@Payload() payload: { temperature: string, humidy: string, light: string, nodeId: string }) {
        // console.log(payload);

        return this.usersService.handleAddValue(payload)
    }

    @MessagePattern('handleGetUserInfo')
    async handleGetUserInfo(@Payload() userId: string) {
        return this.usersService.handleGetUserInfo(userId);
    }
}
