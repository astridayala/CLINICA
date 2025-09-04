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
exports.ProceduresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const procedures_service_1 = require("./procedures.service");
const create_procedures_dto_1 = require("./dto/create-procedures.dto");
let ProceduresController = class ProceduresController {
    proceduresService;
    constructor(proceduresService) {
        this.proceduresService = proceduresService;
    }
    create(createProceduresDto) {
        return this.proceduresService.create(createProceduresDto);
    }
    findAll() {
        return this.proceduresService.findAll();
    }
    findOne(id) {
        return this.proceduresService.findOne(id);
    }
    remove(id) {
        return this.proceduresService.remove(id);
    }
};
exports.ProceduresController = ProceduresController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo procedimiento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Procedimiento creado exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_procedures_dto_1.CreateProcedureDto]),
    __metadata("design:returntype", void 0)
], ProceduresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los procedimientos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de los procedimiento' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProceduresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene el procedimiento por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Procedimiento obtenido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Procedimiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProceduresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un procedimiento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Procedimiento eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Procedimiento no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProceduresController.prototype, "remove", null);
exports.ProceduresController = ProceduresController = __decorate([
    (0, swagger_1.ApiTags)('procedures'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('procedures'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [procedures_service_1.ProceduresService])
], ProceduresController);
//# sourceMappingURL=procedures.controller.js.map