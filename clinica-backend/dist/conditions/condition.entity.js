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
exports.Condition = void 0;
const typeorm_1 = require("typeorm");
const medical_record_condition_entity_1 = require("../medical_record_conditions/medical_record_condition.entity");
let Condition = class Condition {
    id;
    name;
    medicalRecordConditions;
};
exports.Condition = Condition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], Condition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Condition.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medical_record_condition_entity_1.MedicalRecordCondition, mrc => mrc.condition),
    __metadata("design:type", Array)
], Condition.prototype, "medicalRecordConditions", void 0);
exports.Condition = Condition = __decorate([
    (0, typeorm_1.Entity)('condition')
], Condition);
//# sourceMappingURL=condition.entity.js.map