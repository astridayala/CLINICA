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
let PaymentsService = class PaymentsService {
    paymentsRepository;
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async create(createPaymentsDto) {
        const { procedureId, date, amount } = createPaymentsDto;
        const [year, month, day] = date.split('/').map(Number);
        if (isNaN(year) || isNaN(month) || isNaN(day) ||
            year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
            throw new Error('La fecha contiene valores inválidos');
        }
        const paymentDate = new Date(year, month - 1, day);
        const newPayment = this.paymentsRepository.create({
            date: paymentDate,
            amount,
            procedure: { id: procedureId }
        });
        return this.paymentsRepository.save(newPayment);
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map