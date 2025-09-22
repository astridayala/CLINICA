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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePaymentsDto {
    procedureId;
    date;
    amount;
}
exports.CreatePaymentsDto = CreatePaymentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del procedimiento al que pertenece el pago',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El procedimiento del tratamiento es requerido' }),
    __metadata("design:type", String)
], CreatePaymentsDto.prototype, "procedureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025/09/14', description: 'Fecha del pago en formato YYYY/MM/DD' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha es requerida' }),
    (0, class_validator_1.Matches)(/^\d{4}\/\d{2}\/\d{2}$/, {
        message: 'La fecha debe tener el formato YYYY/MM/DD',
    }),
    __metadata("design:type", String)
], CreatePaymentsDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monto del pago',
        example: 120.50,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El monto del pago es requerido' }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    __metadata("design:type", Number)
], CreatePaymentsDto.prototype, "amount", void 0);
//# sourceMappingURL=create-payments.dto.js.map