import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/users.entity';

/**
 * Controlador de pacientes
 * Maneja endpoints para crear, obtener y actualizar pacientes
 */
@ApiTags('patients')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    /**
     * Obtiene todos los pacientes
     * @returns Lista de todos los pacientes
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todos los pacientes' })
    @ApiResponse({ status: 200, description: 'Lista de pacientes obtenida exitosamente' })
    findAll(@GetUser() user:User) {
        return this.patientsService.findAll(user);
    }

    /**
     * Crea un nuevo paciente
     * @param createPatientDto - Datos del paciente a crear
     * @returns El paciente creado
     */
    @Post()
    @ApiOperation({ summary: 'Crear un nuevo paciente' })
    @ApiResponse({ status: 201, description: 'Paciente creado existosamente' })
    create(@Body() createPatientDto: CreatePatientDto, @GetUser() user:User) {
        return this.patientsService.create(createPatientDto, user);
    }

    /**
     * Obtiene un paciente por su ID
     * @param id - ID del paciente a buscar
     * @returns Datos del paciente encontrado
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un paciente por ID' })
    @ApiResponse({ status: 200, description: 'Paciente obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    findOne(
        @Param('id', ParseUUIDPipe) id: string, // Valida que sea un UUID válido
        @GetUser() user: User,
    ) {
        return this.patientsService.findOne(id, user);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Paciente actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })    
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePatientDto: UpdatePatientDto,
        @GetUser() user: User,
    ) {
        return this.patientsService.update(id, updatePatientDto, user);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Paciente eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.patientsService.remove(id);
    }
}
