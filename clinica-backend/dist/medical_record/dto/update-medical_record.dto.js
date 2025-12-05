"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMedicalRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_medical_record_dto_1 = require("./create-medical_record.dto");
class UpdateMedicalRecordDto extends (0, swagger_1.PartialType)(create_medical_record_dto_1.CreateMedicalRecordDto) {
}
exports.UpdateMedicalRecordDto = UpdateMedicalRecordDto;
//# sourceMappingURL=update-medical_record.dto.js.map