"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordConditionsModule = void 0;
const common_1 = require("@nestjs/common");
const medical_record_conditions_service_1 = require("./medical_record_conditions.service");
const medical_record_conditions_controller_1 = require("./medical_record_conditions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const medical_record_condition_entity_1 = require("./medical_record_condition.entity");
let MedicalRecordConditionsModule = class MedicalRecordConditionsModule {
};
exports.MedicalRecordConditionsModule = MedicalRecordConditionsModule;
exports.MedicalRecordConditionsModule = MedicalRecordConditionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([medical_record_condition_entity_1.MedicalRecordCondition])],
        providers: [medical_record_conditions_service_1.MedicalRecordConditionsService],
        controllers: [medical_record_conditions_controller_1.MedicalRecordConditionsController],
        exports: [medical_record_conditions_service_1.MedicalRecordConditionsService]
    })
], MedicalRecordConditionsModule);
//# sourceMappingURL=medical_record_conditions.module.js.map