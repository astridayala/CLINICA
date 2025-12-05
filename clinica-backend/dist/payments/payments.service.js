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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("./payment.entity");
const typeorm_2 = require("typeorm");
const procedure_entity_1 = require("../procedures/procedure.entity");
let PaymentsService = class PaymentsService {
    paymentsRepository;
    proceduresRepository;
    constructor(paymentsRepository, proceduresRepository) {
        this.paymentsRepository = paymentsRepository;
        this.proceduresRepository = proceduresRepository;
    }
    async create(createPaymentsDto) {
        const { procedureId, date, amount } = createPaymentsDto;
        const procedure = await this.proceduresRepository.findOne({
            where: { id: procedureId },
        });
        if (!procedure) {
            throw new common_1.NotFoundException('El procedimiento no existe');
        }
        const payment = this.paymentsRepository.create({
            date: date,
            amount: amount,
            procedure: procedure,
        });
        return await this.paymentsRepository.save(payment);
    }
    async findAll() {
        return this.paymentsRepository.find();
    }
    async findOne(id) {
        const payment = await this.paymentsRepository.findOne({
            where: { id },
            relations: ['procedure']
        });
        if (!payment)
            throw new common_1.NotFoundException(`Pago con id ${id} no encontrado`);
        return payment;
    }
    async remove(id) {
        const payment = await this.paymentsRepository.delete(id);
        if (payment.affected === 0) {
            throw new common_1.NotFoundException(`Pago con id ${id} no encontrado`);
        }
        return { message: `El pago con id ${id} fue eliminado correctamente` };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(procedure_entity_1.Procedure)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map