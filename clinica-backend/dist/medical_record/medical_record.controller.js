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
exports.MedicalRecordController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const medical_record_service_1 = require("./medical_record.service");
const create_medical_record_dto_1 = require("./dto/create-medical_record.dto");
let MedicalRecordController = class MedicalRecordController {
    medicalRecordService;
    constructor(medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }
    create(createMedicalRecordDto) {
        return this.medicalRecordService.create(createMedicalRecordDto);
    }
    findAll() {
        return this.medicalRecordService.findAll();
    }
    findOne(id) {
        return this.medicalRecordService.findOne(id);
    }
};
exports.MedicalRecordController = MedicalRecordController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo historial medico' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sitio creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los historiales clinicos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuarios obtenidos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un historial medico por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial Medico obtenido exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Historial Medico no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordController.prototype, "findOne", null);
exports.MedicalRecordController = MedicalRecordController = __decorate([
    (0, swagger_1.ApiTags)('medical_record'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('medical-record'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [medical_record_service_1.MedicalRecordService])
], MedicalRecordController);
//# sourceMappingURL=medical_record.controller.js.map