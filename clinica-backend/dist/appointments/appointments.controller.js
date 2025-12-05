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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const appointments_service_1 = require("./appointments.service");
const appointments_dto_1 = require("./dto/appointments.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const users_entity_1 = require("../users/users.entity");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    create(createAppointmentsDto, user) {
        return this.appointmentsService.create(createAppointmentsDto, user);
    }
    findAll(user) {
        return this.appointmentsService.findAll(user);
    }
    findOne(id, user) {
        return this.appointmentsService.findOne(id, user);
    }
    findByPatient(patientId, user) {
        return this.appointmentsService.findByPatient(patientId, user);
    }
    remove(id, user) {
        return this.appointmentsService.remove(id, user);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea una cita' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cita creada exitosamente' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointments_dto_1.CreateAppointmentsDto, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las citas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de citas' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene las citas por su ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cita obtenida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cita no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene las citas de un paciente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cita obtenida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cita no encontrada' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina una cita' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cita eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cita no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "remove", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiTags)('appointments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map