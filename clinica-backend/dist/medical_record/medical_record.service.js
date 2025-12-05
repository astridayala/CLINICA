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
exports.MedicalRecordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medical_record_entity_1 = require("./medical_record.entity");
const typeorm_2 = require("typeorm");
const patient_entity_1 = require("../patients/patient.entity");
let MedicalRecordService = class MedicalRecordService {
    medicalRecordRepository;
    patientRepository;
    constructor(medicalRecordRepository, patientRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
    }
    async create(createMedicalRecordDto) {
        const patient = await this.patientRepository.findOneBy({
            id: createMedicalRecordDto.patientId
        });
        if (!patient)
            throw new common_1.NotFoundException('Paciente no encontrado');
        const newMedicalRecord = this.medicalRecordRepository.create({
            patient: patient,
            conditions: [],
            treatments: []
        });
        return this.medicalRecordRepository.save(newMedicalRecord);
    }
    async findOne(id) {
        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: { id },
            relations: [
                'patient',
                'conditions',
                'conditions.condition',
                'treatments',
                'treatments.treatmentType',
                'treatments.status',
                'treatments.procedures',
                'treatments.procedures.payment',
            ],
        });
        if (!medicalRecord) {
            throw new common_1.NotFoundException(`Historial Medico ${id} no encontrado`);
        }
        return medicalRecord;
    }
    async findAll() {
        const medicalRecord = await this.medicalRecordRepository.find({
            relations: ['patient'],
            order: { createdAt: 'DESC' },
        });
        if (!medicalRecord || medicalRecord.length === 0) {
            throw new common_1.NotFoundException('No hay historiales médicos registrados');
        }
        return medicalRecord;
    }
    async update(id, updateMedicalRecordDto) {
        const record = await this.findOne(id);
        this.medicalRecordRepository.merge(record, updateMedicalRecordDto);
        return this.medicalRecordRepository.save(record);
    }
};
exports.MedicalRecordService = MedicalRecordService;
exports.MedicalRecordService = MedicalRecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medical_record_entity_1.MedicalRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.Patient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MedicalRecordService);
//# sourceMappingURL=medical_record.service.js.map