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
const medical_record_entity_1 = require("../medical-record/medical-record.entity");
const treatment_type_entity_1 = require("../treatments-types/treatment-type.entity");
const typeorm_1 = require("typeorm");
const procedure_entity_1 = require("../procedures/procedure.entity");
let Treatment = class Treatment {
    id;
    medicalRecord;
    treatmentType;
    totalPrice;
    startDate;
    status;
    procedures;
    createdAt;
};
exports.Treatment = Treatment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Treatment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medical_record_entity_1.MedicalRecord, record => record.treatments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medical-record-id' }),
    __metadata("design:type", medical_record_entity_1.MedicalRecord)
], Treatment.prototype, "medicalRecord", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => treatment_type_entity_1.TreatmentType, type => type.treatments),
    (0, typeorm_1.JoinColumn)({ name: 'treatment-type-id' }),
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
    (0, typeorm_1.Column)({
        name: 'treatment-data',
        type: 'enum',
        enum: ['activo, finalizado']
    }),
    __metadata("design:type", String)
], Treatment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => procedure_entity_1.Procedure, procedure => procedure.treatment, { cascade: true }),
    __metadata("design:type", Array)
], Treatment.prototype, "procedures", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Treatment.prototype, "createdAt", void 0);
exports.Treatment = Treatment = __decorate([
    (0, typeorm_1.Entity)()
], Treatment);
//# sourceMappingURL=treatment.entity.js.map