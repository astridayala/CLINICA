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
exports.TreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_entity_1 = require("./treatment.entity");
const typeorm_2 = require("typeorm");
const treatment_status_entity_1 = require("../treatment_statuses/treatment_status.entity");
let TreatmentsService = class TreatmentsService {
    treatmentRepository;
    treatmentStatusRepository;
    constructor(treatmentRepository, treatmentStatusRepository) {
        this.treatmentRepository = treatmentRepository;
        this.treatmentStatusRepository = treatmentStatusRepository;
    }
    async create(createTreatmentDto) {
        const newTreatment = this.treatmentRepository.create(createTreatmentDto);
        const activeStatus = await this.treatmentStatusRepository.findOne({
            where: { name: 'Activo' },
        });
        if (!activeStatus) {
            throw new Error('El estado "Activo" no está registrado en la base de datos.');
        }
        newTreatment.status = activeStatus;
        return this.treatmentRepository.save(newTreatment);
    }
    async findAll() {
        return this.treatmentRepository.find();
    }
    async findOne(id) {
        const treatment = await this.treatmentRepository.findOne({ where: { id } });
        if (!treatment) {
            throw new common_1.NotFoundException(`Tratamiento ${id} no encontrado`);
        }
        return treatment;
    }
    async remove(id) {
        const treatment = await this.findOne(id);
        await this.treatmentRepository.remove(treatment);
        return true;
    }
};
exports.TreatmentsService = TreatmentsService;
exports.TreatmentsService = TreatmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(treatment_entity_1.Treatment)),
    __param(1, (0, typeorm_1.InjectRepository)(treatment_status_entity_1.TreatmentStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TreatmentsService);
//# sourceMappingURL=treatments.service.js.map