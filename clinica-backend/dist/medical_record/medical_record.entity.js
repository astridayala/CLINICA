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
exports.MedicalRecord = void 0;
const patient_entity_1 = require("../patients/patient.entity");
const typeorm_1 = require("typeorm");
const medical_record_condition_entity_1 = require("../medical_record_conditions/medical_record_condition.entity");
const treatment_entity_1 = require("../treatments/treatment.entity");
let MedicalRecord = class MedicalRecord {
    id;
    patient;
    conditions;
    treatments;
    createdAt;
};
exports.MedicalRecord = MedicalRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MedicalRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => patient_entity_1.Patient, patient => patient.medicalRecord),
    __metadata("design:type", patient_entity_1.Patient)
], MedicalRecord.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medical_record_condition_entity_1.MedicalRecordCondition, mrc => mrc.medicalRecord, { cascade: true }),
    __metadata("design:type", Array)
], MedicalRecord.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => treatment_entity_1.Treatment, treatment => treatment.medicalRecord, { cascade: true }),
    __metadata("design:type", Array)
], MedicalRecord.prototype, "treatments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MedicalRecord.prototype, "createdAt", void 0);
exports.MedicalRecord = MedicalRecord = __decorate([
    (0, typeorm_1.Entity)('medical_record')
], MedicalRecord);
//# sourceMappingURL=medical_record.entity.js.map