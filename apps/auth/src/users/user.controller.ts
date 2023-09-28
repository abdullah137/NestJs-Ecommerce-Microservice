import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserRequest } from './dtos/create-user.request';
import { UsersService } from "./user.service";

@Controller('auth/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request);
    }
}