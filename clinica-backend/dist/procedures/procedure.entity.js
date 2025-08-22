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
exports.Procedure = void 0;
const payment_entity_1 = require("../payments/payment.entity");
const treatment_entity_1 = require("../treatments/treatment.entity");
const typeorm_1 = require("typeorm");
let Procedure = class Procedure {
    id;
    treatment;
    date;
    description;
    payment;
    createdAt;
};
exports.Procedure = Procedure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Procedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => treatment_entity_1.Treatment, treatment => treatment.procedures, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'treatment_id' }),
    __metadata("design:type", treatment_entity_1.Treatment)
], Procedure.prototype, "treatment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Procedure.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Procedure.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.Payment, payment => payment.procedure, { cascade: true }),
    __metadata("design:type", payment_entity_1.Payment)
], Procedure.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Procedure.prototype, "createdAt", void 0);
exports.Procedure = Procedure = __decorate([
    (0, typeorm_1.Entity)('procedure')
], Procedure);
//# sourceMappingURL=procedure.entity.js.map