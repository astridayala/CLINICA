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
exports.TreatmentStatusesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_status_entity_1 = require("./treatment_status.entity");
const typeorm_2 = require("typeorm");
let TreatmentStatusesService = class TreatmentStatusesService {
    treatmentStatusRepository;
    constructor(treatmentStatusRepository) {
        this.treatmentStatusRepository = treatmentStatusRepository;
    }
    async create(createTreatmentStatusDto) {
        const newTreatmentStatus = this.treatmentStatusRepository.create(createTreatmentStatusDto);
        return this.treatmentStatusRepository.save(newTreatmentStatus);
    }
    async findAll() {
        return this.treatmentStatusRepository.find();
    }
    async findOne(id) {
        const treatmentStatus = await this.treatmentStatusRepository.findOne({ where: { id } });
        if (!treatmentStatus) {
            throw new common_1.NotFoundException(`Estado de tratamiendo ${id} no encontrado`);
        }
        return treatmentStatus;
    }
    async remove(id) {
        const treatmentStatus = await this.findOne(id);
        await this.treatmentStatusRepository.remove(treatmentStatus);
        return true;
    }
};
exports.TreatmentStatusesService = TreatmentStatusesService;
exports.TreatmentStatusesService = TreatmentStatusesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(treatment_status_entity_1.TreatmentStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TreatmentStatusesService);
//# sourceMappingURL=treatment_statuses.service.js.map