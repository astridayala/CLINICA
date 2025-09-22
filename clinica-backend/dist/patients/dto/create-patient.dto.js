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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePatientDto {
    name;
    lastName;
    phone;
    email;
    birthDate;
    gender;
    address;
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
], CreatePatientDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '+(503) 23568956',
        description: 'Celular del paciente en formato +(503) 23568956',
    }),
    (0, class_validator_1.Matches)(/^\+\(503\)\s\d{8}$/, {
        message: 'El celular debe tener el formato +(503) 12345678',
    }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'astriayala@gmail.com', description: 'Email del paciente' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un email válido' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000-12-31', description: 'Fecha de nacimiento (YYYY-MM-DD)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de nacimiento es requerida' }),
    (0, class_validator_1.IsDate)({ message: 'La fecha de nacimiento debe ser una fecha válida' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
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
//# sourceMappingURL=create-patient.dto.js.map