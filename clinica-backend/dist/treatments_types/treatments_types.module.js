"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsTypesModule = void 0;
const common_1 = require("@nestjs/common");
const treatments_types_service_1 = require("./treatments_types.service");
const treatments_types_controller_1 = require("./treatments_types.controller");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_type_entity_1 = require("./treatment_type.entity");
let TreatmentsTypesModule = class TreatmentsTypesModule {
};
exports.TreatmentsTypesModule = TreatmentsTypesModule;
exports.TreatmentsTypesModule = TreatmentsTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([treatment_type_entity_1.TreatmentType])],
        providers: [treatments_types_service_1.TreatmentsTypesService],
        controllers: [treatments_types_controller_1.TreatmentsTypesController],
        exports: [treatments_types_service_1.TreatmentsTypesService]
    })
], TreatmentsTypesModule);
//# sourceMappingURL=treatments_types.module.js.map