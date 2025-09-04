"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const patients_module_1 = require("./patients/patients.module");
const medical_record_module_1 = require("./medical_record/medical_record.module");
const condition_module_1 = require("./conditions/condition.module");
const medical_record_conditions_module_1 = require("./medical_record_conditions/medical_record_conditions.module");
const treatments_types_module_1 = require("./treatments_types/treatments_types.module");
const treatments_module_1 = require("./treatments/treatments.module");
const procedures_module_1 = require("./procedures/procedures.module");
const payments_module_1 = require("./payments/payments.module");
const treatment_statuses_module_1 = require("./treatment_statuses/treatment_statuses.module");
const appointments_module_1 = require("./appointments/appointments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            patients_module_1.PatientModule,
            medical_record_module_1.MedicalRecordModule,
            condition_module_1.ConditionsModule,
            medical_record_conditions_module_1.MedicalRecordConditionsModule,
            treatments_types_module_1.TreatmentsTypesModule,
            treatments_module_1.TreatmentsModule,
            procedures_module_1.ProceduresModule,
            payments_module_1.PaymentsModule,
            treatment_statuses_module_1.TreatmentStatusesModule,
            appointments_module_1.AppointmentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map