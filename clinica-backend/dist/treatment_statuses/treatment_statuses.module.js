"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentStatusesModule = void 0;
const common_1 = require("@nestjs/common");
const treatment_statuses_service_1 = require("./treatment_statuses.service");
const treatment_statuses_controller_1 = require("./treatment_statuses.controller");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_status_entity_1 = require("./treatment_status.entity");
let TreatmentStatusesModule = class TreatmentStatusesModule {
};
exports.TreatmentStatusesModule = TreatmentStatusesModule;
exports.TreatmentStatusesModule = TreatmentStatusesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([treatment_status_entity_1.TreatmentStatus])],
        providers: [treatment_statuses_service_1.TreatmentStatusesService],
        controllers: [treatment_statuses_controller_1.TreatmentStatusesController],
        exports: [treatment_statuses_service_1.TreatmentStatusesService]
    })
], TreatmentStatusesModule);
//# sourceMappingURL=treatment_statuses.module.js.map