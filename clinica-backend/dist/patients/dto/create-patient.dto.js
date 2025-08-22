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
exports.CreatePatientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class CreatePatientDto {
    name;
    lastname;
    phone;
    email;
    birthDate;
    gender;
    address;
    createdAt;
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Astrid Violeta', description: 'Nombres del paciente' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ayala Ayala', description: 'Apellidos del paciente' }),
    (0, class_validator_1.IsString)({ message: 'El Apellido debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El Apellido es requerido' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: '+50312234556', description: 'Celular del paciente' }),
    (0, class_validator_1.IsPhoneNumber)('SV', { message: 'El celular debe ser un número válido de El Salvador' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'astriayala@gmail.com', description: 'Email del paciente' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '31/12/2000', description: 'Fecha de nacimiento (dd/mm/yyyy)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de nacimiento es requerida' }),
    (0, class_validator_1.IsString)({ message: 'La fecha debe ser una cadena de texto' }),
    (0, class_validator_1.Matches)(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha debe tener el formato dd/mm/yyyy',
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'femenino',
        description: 'Genero del paciente',
        enum: ['femenino', 'masculino'],
    }),
    (0, class_validator_1.IsEnum)(['femenino', 'masculino'], { message: 'El sexo debe ser masculino o femenino' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El sexo es requerido' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'km 12 ½ carretera al Puerto de La Libertad, calle nueva a Comasagua, Santa Tecla, La Libertad', description: 'Dirección del paciente' }),
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CreatePatientDto.prototype, "createdAt", void 0);
//# sourceMappingURL=create-patient.dto.js.map