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
exports.ConditionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const conditions_service_1 = require("./conditions.service");
const create_condition_dto_1 = require("./dto/create-condition.dto");
let ConditionsController = class ConditionsController {
    conditionsService;
    constructor(conditionsService) {
        this.conditionsService = conditionsService;
    }
    create(createConditionDto) {
        return this.conditionsService.create(createConditionDto);
    }
    findAll() {
        return this.conditionsService.findAll();
    }
    findOne(id) {
        return this.conditionsService.finOne(id);
    }
    remove(id) {
        return this.conditionsService.remove(id);
    }
};
exports.ConditionsController = ConditionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un padecimiento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Padecimiento creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_condition_dto_1.CreateConditionDto]),
    __metadata("design:returntype", void 0)
], ConditionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los padecimientos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de padecimientos obtenida exitosamente' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConditionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener el padecimiento por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Padecimiento obtenido exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Padecimiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConditionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un padecimiento existente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Padecimiento eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Padecimiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConditionsController.prototype, "remove", null);
exports.ConditionsController = ConditionsController = __decorate([
    (0, swagger_1.ApiTags)('conditions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('conditions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [conditions_service_1.ConditionsService])
], ConditionsController);
//# sourceMappingURL=conditions.controller.js.map