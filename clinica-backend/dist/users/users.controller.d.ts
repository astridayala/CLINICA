import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): any;
    findAll(): Promise<import("./users.entity").User[]>;
    findOne(id: string): Promise<import("./users.entity").User>;
    remove(id: string): Promise<void>;
}
