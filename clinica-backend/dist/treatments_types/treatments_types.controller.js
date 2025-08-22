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
exports.TreatmentsTypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const treatments_types_service_1 = require("./treatments_types.service");
const create_treatments_types_dto_1 = require("./dto/create-treatments_types.dto");
let TreatmentsTypesController = class TreatmentsTypesController {
    treatmentsTypesService;
    constructor(treatmentsTypesService) {
        this.treatmentsTypesService = treatmentsTypesService;
    }
    create(createTreatmentTypesDto) {
        return this.treatmentsTypesService.create(createTreatmentTypesDto);
    }
    findAll() {
        return this.treatmentsTypesService.findAll();
    }
    findOne(id) {
        return this.treatmentsTypesService.findOne(id);
    }
    remove(id) {
        return this.treatmentsTypesService.remove(id);
    }
};
exports.TreatmentsTypesController = TreatmentsTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un tipo de tratamiento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tipo de tratamiento creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_treatments_types_dto_1.CreateTreatmentTypesDto]),
    __metadata("design:returntype", void 0)
], TreatmentsTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los tipos de tratamientos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de tipos de tratamientos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreatmentsTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener el tipo de tratamiento por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tipo de tratamiento obtenido exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tipo de tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un tipo de tratamiento existente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tipo de tratamiento eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tipo de tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsTypesController.prototype, "remove", null);
exports.TreatmentsTypesController = TreatmentsTypesController = __decorate([
    (0, swagger_1.ApiTags)('treatment_types'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('treatments-types'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [treatments_types_service_1.TreatmentsTypesService])
], TreatmentsTypesController);
//# sourceMappingURL=treatments_types.controller.js.map