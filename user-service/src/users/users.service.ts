import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, USER_MODEL } from 'src/schemas/users.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { NodeIoT, NODEIOT_MODEL } from 'src/schemas/nodeiot.schema';
import { PartialUser } from 'src/users/class/User.class';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(USER_MODEL)
        private readonly userModel: Model<User> & SoftDeleteModel<User>,
        @InjectModel(NODEIOT_MODEL)
        private readonly nodeModel: Model<NodeIoT> & SoftDeleteModel<NodeIoT>,
    ) { }

    async handleAddValue(payload: { temperature: string, humidy: string, light: string, nodeId: string }) {
        const { nodeId, temperature, light, humidy } = payload
        console.log(nodeId);
        const nodeData = await this.nodeModel.findByIdAndUpdate(nodeId, { temperature, humidy, light }).exec();
        console.log(nodeData);

    }

    async handleGetUserInfo(userId: string) {
        const user = await this.userModel.findById(userId).populate({ path: 'nodeiots' }).exec();
        if (!user) {
            return { message: 'Not found user' }
        }
        delete user.password
        return user
    }

    async handleUpdateUserInfo(info: PartialUser) {
        const user = await this.userModel.findOneAndUpdate({ email: info.email }, info, { new: true }).exec();
        if (!user) {
            return { message: 'Not found user' }
        }
        return user
    }
}


