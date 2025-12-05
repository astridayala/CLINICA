import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentsDto } from './dto/appointments.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/users.entity';

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    /**
     * Crea una nueva cita
     * @param createAppointmentsDto - Datos de las citas
     * @returns La cita creada
     */
    @Post()
    @ApiOperation({ summary: 'Crea una cita' })
    @ApiResponse({ status: 201, description: 'Cita creada exitosamente' })
    create(@Body() createAppointmentsDto: CreateAppointmentsDto, @GetUser() user: User) {
        return this.appointmentsService.create(createAppointmentsDto, user);
    }

    /**
     * Obtiene todas las citas
     * @returns Lista de citas
     */
    @Get()
    @ApiOperation({ summary: 'Obtener todas las citas' })
    @ApiResponse({ status: 200, description: 'Lista de citas' })
    findAll(@GetUser() user: User) {
        return this.appointmentsService.findAll(user);
    }

    /**
     * Obtiene la cita por su ID
     * @param id - ID de la cita
     * @returns La cita encontrada
     */
    @Get(':id')
    @ApiOperation({ summary: 'Obtiene las citas por su ID' })
    @ApiResponse({ status: 200, description: 'Cita obtenida' })
    @ApiResponse({ status: 404, description: 'Cita no encontrada' })
    findOne(@Param('id') id: string, @GetUser() user: User) {
        return this.appointmentsService.findOne(id, user);
    }

    @Get('patient/:patientId')
    @ApiOperation({ summary: 'Obtiene las citas de un paciente' })
    @ApiResponse({ status: 200, description: 'Cita obtenida' })
    @ApiResponse({ status: 404, description: 'Cita no encontrada' })
    findByPatient(@Param('patientId') patientId: string, @GetUser() user: User) {
        return this.appointmentsService.findByPatient(patientId, user);
    }

    /**
     * Elimina una cita existente
     * @param id - ID de la cita
     * @returns true si se elimino correctamente
     */
    @Delete(':id')
    @ApiOperation({ summary: 'Elimina una cita' })
    @ApiResponse({ status: 200, description: 'Cita eliminada' })
    @ApiResponse({ status: 404, description: 'Cita no encontrada' })
    remove(@Param('id') id: string, @GetUser() user: User) {
        return this.appointmentsService.remove(id, user);
    }
}
