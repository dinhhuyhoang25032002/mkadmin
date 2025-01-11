import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { PartialUser } from 'src/users/class/User.class';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @EventPattern('handleAddValue')
    async handleAddValue(@Payload() payload: { temperature: string, humidy: string, light: string, nodeId: string }) {
       //  console.log(payload);

        return this.usersService.handleAddValue(payload)
    }
    @MessagePattern('handleUpdateUserInfo')
    async handleUpdateUserInfo(@Payload() info: PartialUser) {
        return this.usersService.handleUpdateUserInfo(info);
    }
    @MessagePattern('handleGetUserInfo')
    async handleGetUserInfo(@Payload() userId: string) {
        return this.usersService.handleGetUserInfo(userId);
    }
}
