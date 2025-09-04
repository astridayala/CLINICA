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
exports.CreateAppointmentsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateAppointmentsDto {
    patientId;
    startTime;
    endTime;
    notes;
}
exports.CreateAppointmentsDto = CreateAppointmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b5d6c9b4-1234-5678-9101-abcdef123456', description: 'ID del paciente' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El paciente es obligatorio' }),
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del paciente debe ser un UUID válido' }),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-09-03 10:00',
        description: 'Fecha y hora de inicio (YYYY-MM-DD HH:mm, 24h)',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha y hora de inicio son obligatorias' }),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La fecha debe tener el formato YYYY-MM-DD HH:mm en 24 horas' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateAppointmentsDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-09-03 11:00',
        description: 'Fecha y hora de fin (YYYY-MM-DD HH:mm, 24h)',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha y hora de fin son obligatorias' }),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d)$/, { message: 'La fecha debe tener el formato YYYY-MM-DD HH:mm en 24 horas' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateAppointmentsDto.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'Retiro de brackets', description: 'Informacion adicional necesaria' }),
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "notes", void 0);
//# sourceMappingURL=appointments.dto.js.map