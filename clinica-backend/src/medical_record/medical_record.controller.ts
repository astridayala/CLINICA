import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { MedicalRecordService } from './medical_record.service';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';

/**
 * Controlador para los historiales medicos
 * Maneja endpoints para crear y obtener el historial
 */
@ApiTags('medical_record')
@ApiBearerAuth()
@Controller('medical-record')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalRecordController {
    constructor(private readonly medicalRecordService: MedicalRecordService) {}

    /**
     * Crea un nueo historial medico
     * @param createMedicalRecordDto - Datos del historial medico a crear
     * @returns El historial medico creado
     */
    @Post()
    @ApiOperation({ summary: 'Crea un nuevo historial medico' })
    @ApiResponse({ status: 201, description: 'Sitio creado exitosamente' })
    create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
        return this.medicalRecordService.create(createMedicalRecordDto);
    }

    /**
     * Obtiene todos los historiales
     * @returns Lista de historiales medicos de los pacientes
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todos los historiales clinicos' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenidos' })
    findAll() {
        return this.medicalRecordService.findAll();
    }

    /**
     * Obtiene un historial medico por su ID
     * @param id - ID del historial medico a buscar
     * @returns Datos del historial medico encontrado
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un historial medico por ID' })
    @ApiResponse({ status: 200, description: 'Historial Medico obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Historial Medico no encontrado' })
    findOne(@Param('id') id: string) {
        return this.medicalRecordService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMedicalRecordDto: UpdateMedicalRecordDto) {
        return this.medicalRecordService.update(id, updateMedicalRecordDto);
    }
}
