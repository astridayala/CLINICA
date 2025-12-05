import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    register(userData: Partial<User>): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            patients: import("../patients/patient.entity").Patient[];
            appointments: import("../patients/patient.entity").Patient[];
            createdAt: Date;
        };
        access_token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: any;
        access_token: string;
    }>;
    private generateToken;
}
