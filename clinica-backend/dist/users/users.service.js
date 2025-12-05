"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    usersRepository;
    configService;
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    async onModuleInit() {
        await this.seedAdminUser();
    }
    async seedAdminUser() {
        const adminEmail = this.configService.get('DEFAULT_ADMIN_EMAIL');
        const adminPassword = this.configService.get('DEFAULT_ADMIN_PASSWORD');
        const adminExists = await this.usersRepository.findOne({ where: { email: adminEmail } });
        if (!adminExists) {
            console.log('No se encontró administrador. Creando admin por defecto...');
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const newAdmin = this.usersRepository.create({
                name: 'Administrador Principal',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            await this.usersRepository.save(newAdmin);
            console.log('Admin por defecto creado exitosamente.');
        }
        else {
            console.log('El administrador ya existe.');
        }
    }
    async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return this.usersRepository.save(newUser);
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map