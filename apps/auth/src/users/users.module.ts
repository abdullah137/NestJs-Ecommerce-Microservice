import {  Module } from "@nestjs/common";
import { UsersService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService]
})
export class UsersModule {}