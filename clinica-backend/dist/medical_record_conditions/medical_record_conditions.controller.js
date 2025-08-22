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
exports.MedicalRecordConditionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const medical_record_conditions_service_1 = require("./medical_record_conditions.service");
const create_medical_record_condition_dto_1 = require("./dto/create-medical_record_condition.dto");
let MedicalRecordConditionsController = class MedicalRecordConditionsController {
    medicalRecordConditionService;
    constructor(medicalRecordConditionService) {
        this.medicalRecordConditionService = medicalRecordConditionService;
    }
    create(createMedicalRecordConditionDto) {
        return this.medicalRecordConditionService.create(createMedicalRecordConditionDto);
    }
    findAll() {
        return this.medicalRecordConditionService.findAll();
    }
    findOne(id) {
        return this.medicalRecordConditionService.findOne(id);
    }
    remove(id) {
        return this.medicalRecordConditionService.remove(id);
    }
};
exports.MedicalRecordConditionsController = MedicalRecordConditionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear relacion entre historial medico y condicion' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Relacion entre historial medico y condicion' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_record_condition_dto_1.CreateMedicalRecordConditionDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordConditionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene todas las relaciones entre historial y condicion' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de las relaciones' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicalRecordConditionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la relacion entre historial y condicion' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relacion entre historial y condicion obtenida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relacion entre historial y condicion no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordConditionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina la relacion entre historial y condicion' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relacion entre historial y condicion eliminada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relacion entre historial y condicion no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordConditionsController.prototype, "remove", null);
exports.MedicalRecordConditionsController = MedicalRecordConditionsController = __decorate([
    (0, swagger_1.ApiTags)('medical_record_conditions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('medical-record-conditions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [medical_record_conditions_service_1.MedicalRecordConditionsService])
], MedicalRecordConditionsController);
//# sourceMappingURL=medical_record_conditions.controller.js.map