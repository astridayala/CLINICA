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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordCondition = void 0;
const condition_entity_1 = require("../conditions/condition.entity");
const medical_record_entity_1 = require("../medical-record/medical-record.entity");
const typeorm_1 = require("typeorm");
let MedicalRecordCondition = class MedicalRecordCondition {
    id;
    medicalRecord;
    condition;
};
exports.MedicalRecordCondition = MedicalRecordCondition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MedicalRecordCondition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_record_entity_1.MedicalRecord, record => record.conditions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medical-record-id' }),
    __metadata("design:type", medical_record_entity_1.MedicalRecord)
], MedicalRecordCondition.prototype, "medicalRecord", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => condition_entity_1.Condition, condition => condition.medicalRecordConditions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'condition-id' }),
    __metadata("design:type", condition_entity_1.Condition)
], MedicalRecordCondition.prototype, "condition", void 0);
exports.MedicalRecordCondition = MedicalRecordCondition = __decorate([
    (0, typeorm_1.Entity)()
], MedicalRecordCondition);
//# sourceMappingURL=medical-record-condition.entity.js.map