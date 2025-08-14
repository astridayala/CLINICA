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
exports.Treatment = void 0;
const medical_record_entity_1 = require("../medical_record/medical_record.entity");
const treatment_type_entity_1 = require("../treatments_types/treatment_type.entity");
const typeorm_1 = require("typeorm");
const procedure_entity_1 = require("../procedures/procedure.entity");
const treatment_status_entity_1 = require("../treatment_statuses/treatment_status.entity");
let Treatment = class Treatment {
    id;
    medicalRecord;
    treatmentType;
    totalPrice;
    startDate;
    procedures;
    status;
    createdAt;
};
exports.Treatment = Treatment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Treatment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_record_entity_1.MedicalRecord, record => record.treatments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medical_record_id' }),
    __metadata("design:type", medical_record_entity_1.MedicalRecord)
], Treatment.prototype, "medicalRecord", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => treatment_type_entity_1.TreatmentType, type => type.treatments),
    (0, typeorm_1.JoinColumn)({ name: 'treatment_type_id' }),
    __metadata("design:type", treatment_type_entity_1.TreatmentType)
], Treatment.prototype, "treatmentType", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Treatment.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Treatment.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => procedure_entity_1.Procedure, procedure => procedure.treatment, { cascade: true }),
    __metadata("design:type", Array)
], Treatment.prototype, "procedures", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => treatment_status_entity_1.TreatmentStatus, status => status.treatments),
    (0, typeorm_1.JoinColumn)({ name: 'status_id' }),
    __metadata("design:type", treatment_status_entity_1.TreatmentStatus)
], Treatment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Treatment.prototype, "createdAt", void 0);
exports.Treatment = Treatment = __decorate([
    (0, typeorm_1.Entity)('treatment')
], Treatment);
//# sourceMappingURL=treatment.entity.js.map