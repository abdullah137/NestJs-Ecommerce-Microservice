import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "./user.repository";
import { CreateUserRequest } from "./dtos/create-user.request";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UserRepository){}

    private async validateCreateUserRequest(request: CreateUserRequest) {
        let user: User;
        try {
            user = await this.usersRepository.findOne({
                email: request.email
            });
        } catch (error) {}

        if(user) {
            throw new UnprocessableEntityException('Email already exists.');
        }
    }

    async createUser(request: CreateUserRequest) {
        await this.validateCreateUserRequest(request);
        const user = await this.usersRepository.create({
            ...request,
            password: await bcrypt.hash(request.password, 10),
        });
        return user;
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }
        return user;
    }

    async getUser(getUserArgs: Partial<User>) {
        return this.usersRepository.findOne(getUserArgs);
    }
}