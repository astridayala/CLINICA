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
exports.TreatmentsTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const treatment_type_entity_1 = require("./treatment_type.entity");
const typeorm_2 = require("typeorm");
let TreatmentsTypesService = class TreatmentsTypesService {
    treatmentsTypeRepository;
    constructor(treatmentsTypeRepository) {
        this.treatmentsTypeRepository = treatmentsTypeRepository;
    }
    async create(createTreatmentTypesDto) {
        const newTreatmentType = this.treatmentsTypeRepository.create(createTreatmentTypesDto);
        return this.treatmentsTypeRepository.save(newTreatmentType);
    }
    async findAll() {
        return this.treatmentsTypeRepository.find();
    }
    async findOne(id) {
        const treatmentType = await this.treatmentsTypeRepository.findOne({ where: { id } });
        if (!treatmentType) {
            throw new common_1.NotFoundException(`Tipo de Tratamiento ${id} no encontrado`);
        }
        return treatmentType;
    }
    async remove(id) {
        const treatmentType = await this.findOne(id);
        await this.treatmentsTypeRepository.remove(treatmentType);
        return true;
    }
};
exports.TreatmentsTypesService = TreatmentsTypesService;
exports.TreatmentsTypesService = TreatmentsTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(treatment_type_entity_1.TreatmentType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TreatmentsTypesService);
//# sourceMappingURL=treatments_types.service.js.map