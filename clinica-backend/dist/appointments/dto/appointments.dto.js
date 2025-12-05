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
const class_validator_1 = require("class-validator");
class CreateAppointmentsDto {
    patientId;
    start;
    end;
    description;
}
exports.CreateAppointmentsDto = CreateAppointmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b5d6c9b4-1234-5678-9101-abcdef123456', description: 'ID del paciente' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El paciente es obligatorio' }),
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del paciente debe ser un UUID válido' }),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "patientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-09-03 10:00', description: 'YYYY-MM-DD HH:mm' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de inicio es obligatoria' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, { message: 'El formato debe ser YYYY-MM-DD HH:mm' }),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-09-03 11:00', description: 'YYYY-MM-DD HH:mm' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de fin es obligatoria' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, { message: 'El formato debe ser YYYY-MM-DD HH:mm' }),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "end", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'Limpieza dental', description: 'Descripción' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentsDto.prototype, "description", void 0);
//# sourceMappingURL=appointments.dto.js.map