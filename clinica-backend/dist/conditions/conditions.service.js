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
exports.ConditionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const condition_entity_1 = require("./condition.entity");
const typeorm_2 = require("typeorm");
let ConditionsService = class ConditionsService {
    conditionsRepository;
    constructor(conditionsRepository) {
        this.conditionsRepository = conditionsRepository;
    }
    async create(createConditionDto) {
        const newCondition = this.conditionsRepository.create(createConditionDto);
        return this.conditionsRepository.save(newCondition);
    }
    async findAll() {
        return this.conditionsRepository.find();
    }
    async finOne(id) {
        const condition = await this.conditionsRepository.findOne({ where: { id } });
        if (!condition) {
            throw new common_1.NotFoundException(`Padecimiento con ID ${id} no encontrado`);
        }
        return condition;
    }
    async remove(id) {
        const condition = await this.finOne(id);
        await this.conditionsRepository.remove(condition);
        return true;
    }
};
exports.ConditionsService = ConditionsService;
exports.ConditionsService = ConditionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(condition_entity_1.Condition)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConditionsService);
//# sourceMappingURL=conditions.service.js.map