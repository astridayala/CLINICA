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
exports.MedicalRecordConditionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medical_record_condition_entity_1 = require("./medical_record_condition.entity");
const typeorm_2 = require("typeorm");
let MedicalRecordConditionsService = class MedicalRecordConditionsService {
    medicalRecordConditionRepository;
    constructor(medicalRecordConditionRepository) {
        this.medicalRecordConditionRepository = medicalRecordConditionRepository;
    }
    async create(createMedicalRecordConditionDto) {
        const { medicalRecordId, conditionId } = createMedicalRecordConditionDto;
        const newMedicalRecordCondition = this.medicalRecordConditionRepository.create({
            medicalRecord: { id: medicalRecordId },
            condition: { id: conditionId },
        });
        return this.medicalRecordConditionRepository.save(newMedicalRecordCondition);
    }
    async findAll() {
        return this.medicalRecordConditionRepository.find();
    }
    async findOne(id) {
        const medicalRecordCondition = await this.medicalRecordConditionRepository.findOne({
            where: { id },
            relations: [
                'medicalRecord.patient',
                'condition'
            ]
        });
        if (!medicalRecordCondition) {
            throw new common_1.NotFoundException(`La relacion ${id} entre historial y condicion no encontrado`);
        }
        return medicalRecordCondition;
    }
    async remove(id) {
        const medicalRecordCondition = await this.findOne(id);
        await this.medicalRecordConditionRepository.remove(medicalRecordCondition);
        return true;
    }
};
exports.MedicalRecordConditionsService = MedicalRecordConditionsService;
exports.MedicalRecordConditionsService = MedicalRecordConditionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medical_record_condition_entity_1.MedicalRecordCondition)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicalRecordConditionsService);
//# sourceMappingURL=medical_record_conditions.service.js.map