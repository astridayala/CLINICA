import { OnModuleInit } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class UsersService implements OnModuleInit {
    private usersRepository;
    private configService;
    constructor(usersRepository: Repository<User>, configService: ConfigService);
    onModuleInit(): Promise<void>;
    seedAdminUser(): Promise<void>;
    create(userData: Partial<User>): Promise<User>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    remove(id: string): Promise<void>;
}
