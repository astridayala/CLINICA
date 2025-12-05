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
exports.TreatmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const treatments_service_1 = require("./treatments.service");
const create_treatment_dto_1 = require("./dto/create-treatment.dto");
const update_treatment_dto_1 = require("./dto/update-treatment.dto");
let TreatmentsController = class TreatmentsController {
    treatmentsService;
    constructor(treatmentsService) {
        this.treatmentsService = treatmentsService;
    }
    create(createTreatmentDto) {
        return this.treatmentsService.create(createTreatmentDto);
    }
    findAll() {
        return this.treatmentsService.findAll();
    }
    findOne(id) {
        return this.treatmentsService.findOne(id);
    }
    remove(id) {
        return this.treatmentsService.remove(id);
    }
    update(id, updateTreatmentDto) {
        return this.treatmentsService.update(id, updateTreatmentDto);
    }
};
exports.TreatmentsController = TreatmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un tratamiento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tratamiento creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_treatment_dto_1.CreateTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los tratamientos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de tratamientos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene los tratamientos por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tratamiento obtenido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un tratamiento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tratamiento eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_treatment_dto_1.UpdateTreatmentDto]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "update", null);
exports.TreatmentsController = TreatmentsController = __decorate([
    (0, swagger_1.ApiTags)('treatments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('treatments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [treatments_service_1.TreatmentsService])
], TreatmentsController);
//# sourceMappingURL=treatments.controller.js.map