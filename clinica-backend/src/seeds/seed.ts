import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/users.entity';
import { Condition } from 'src/conditions/condition.entity';
import { TreatmentType } from 'src/treatments_types/treatment_type.entity';
import { TreatmentStatus } from 'src/treatment_statuses/treatment_status.entity';
import { Patient } from 'src/patients/patient.entity';

// Crear una instancia de DataSource directamente en el script
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'clinica-db',
  entities: [User, Condition, TreatmentType, TreatmentStatus, Patient], // Incluir todas las entidades relacionadas
  synchronize: false,
});

/**
 * Script para sembrar datos iniciales en la base de datos
 * Compatible con TypeORM 0.3.x
 */
async function main() {
  console.log('Iniciando proceso de seeding...');
  
  try {
    // Inicializar la conexión
    await dataSource.initialize();
    console.log('Conexión a la base de datos establecida');
    
    // Hash de contraseñas
    const adminPassword = await bcrypt.hash('astri10', 10);
    const doctorPassword = await bcrypt.hash('gus712026', 10);
    
    console.log('Creando usuarios iniciales...');
    
    // Crear usuario administrador
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Administrador',
          email: 'astriayala06@gmail.com',
          password: adminPassword,
          role: 'admin',
        },
      ])
      .execute();
    console.log('Usuario administrador creado');
    
    // Crear usuario doctor
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Doctor',
          email: 'gustavo.ayala2200@gmail.com',
          password: doctorPassword,
          role: 'doctor',
        },
      ])
      .execute();
    console.log('Usuario analista creado');

    //Crear paciente
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Patient)
      .values({
        name: 'Astrid Violeta',
        lastName: 'Ayala Ayala',
        phone: '+50323568953',
        email: 'astriayala06@gmail.com',
        birthDate: new Date('2004-10-06'),
        gender: 'femenino',
        address: 'B° Morazán, Calle Zeledón, Cuyultitán, La Paz Oeste, La Paz'
      })
      .execute()
    console.log('Paciente creado')
    
    //Crear condiciones o padecimientos
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Condition)
      .values([
        { name: 'Diabetes' },
        { name: 'Hipertensión' },
        { name: 'Alergia Ibuprofeno' },
        { name: 'Osteoporosis' },
        { name: 'Insuficiencia Renal' },
        { name: 'Tiroides' },
        { name: 'Problemas cardíacos' },
        { name: 'Artitris' },
        { name: 'Lupus' },
        { name: 'Anemia' },
        { name: 'Cáncer' },
      ])
      .execute();
    console.log('Padecimientos creados')

    //Crear tipos de tratamientos
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TreatmentType)
      .values([
        { name: 'Consultas' },
        { name: 'Aparatología interceptiva' },
        { name: 'Guarda oclusal' },
        { name: 'Mantenedor de espacio' },
        { name: 'Frenectomía lingual' },
        { name: 'Frenectomía labial superior' },
        { name: 'Frenectomía labial inferior' },
        { name: 'Prótesis removible' },
        { name: 'Prótesis fija' },
        { name: 'Prótesis completa' },

        { name: 'Cirugía cordal: 1-8' },
        { name: 'Cirugía cordal: 2-8' },
        { name: 'Cirugía cordal: 3-8' },
        { name: 'Cirugía cordal: 4-8' },

        { name: 'Canino retenido: 1-3' },
        { name: 'Canino retenido: 2-3' },
        { name: 'Canino retenido: 3-3' },
        { name: 'Canino retenido: 4-3' },

        { name: 'Pulpotomía: 1-1' },
        { name: 'Pulpotomía: 1-2' },
        { name: 'Pulpotomía: 1-3' },
        { name: 'Pulpotomía: 1-4' },
        { name: 'Pulpotomía: 1-5' },

        { name: 'Pulpotomía: 2-1' },
        { name: 'Pulpotomía: 2-2' },
        { name: 'Pulpotomía: 2-3' },
        { name: 'Pulpotomía: 2-4' },
        { name: 'Pulpotomía: 2-5' },

        { name: 'Pulpotomía: 3-1' },
        { name: 'Pulpotomía: 3-2' },
        { name: 'Pulpotomía: 3-3' },
        { name: 'Pulpotomía: 3-4' },
        { name: 'Pulpotomía: 3-5' },

        { name: 'Pulpotomía: 4-1' },
        { name: 'Pulpotomía: 4-2' },
        { name: 'Pulpotomía: 4-3' },
        { name: 'Pulpotomía: 4-4' },
        { name: 'Pulpotomía: 4-5' },

        { name: 'Pulpectomía: 1-1' },
        { name: 'Pulpectomía: 1-2' },
        { name: 'Pulpectomía: 1-3' },
        { name: 'Pulpectomía: 1-4' },
        { name: 'Pulpectomía: 1-5' },

        { name: 'Pulpectomía: 2-1' },
        { name: 'Pulpectomía: 2-2' },
        { name: 'Pulpectomía: 2-3' },
        { name: 'Pulpectomía: 2-4' },
        { name: 'Pulpectomía: 2-5' },

        { name: 'Pulpectomía: 3-1' },
        { name: 'Pulpectomía: 3-2' },
        { name: 'Pulpectomía: 3-3' },
        { name: 'Pulpectomía: 3-4' },
        { name: 'Pulpectomía: 3-5' },

        { name: 'Pulpectomía: 4-1' },
        { name: 'Pulpectomía: 4-2' },
        { name: 'Pulpectomía: 4-3' },
        { name: 'Pulpectomía: 4-4' },
        { name: 'Pulpectomía: 4-5' },

        { name: 'Extracción: 1-1' },
        { name: 'Extracción: 1-2' },
        { name: 'Extracción: 1-3' },
        { name: 'Extracción: 1-4' },
        { name: 'Extracción: 1-5' },
        { name: 'Extracción: 1-6' },
        { name: 'Extracción: 1-7' },

        { name: 'Extracción: 2-1' },
        { name: 'Extracción: 2-2' },
        { name: 'Extracción: 2-3' },
        { name: 'Extracción: 2-4' },
        { name: 'Extracción: 2-5' },
        { name: 'Extracción: 2-6' },
        { name: 'Extracción: 2-7' },

        { name: 'Extracción: 3-1' },
        { name: 'Extracción: 3-2' },
        { name: 'Extracción: 3-3' },
        { name: 'Extracción: 3-4' },
        { name: 'Extracción: 3-5' },
        { name: 'Extracción: 3-6' },
        { name: 'Extracción: 3-7' },

        { name: 'Extracción: 4-1' },
        { name: 'Extracción: 4-2' },
        { name: 'Extracción: 4-3' },
        { name: 'Extracción: 4-4' },
        { name: 'Extracción: 4-5' },
        { name: 'Extracción: 4-6' },
        { name: 'Extracción: 4-7' },

        { name: 'Endodoncia: 1-1' },
        { name: 'Endodoncia: 1-2' },
        { name: 'Endodoncia: 1-3' },
        { name: 'Endodoncia: 1-4' },
        { name: 'Endodoncia: 1-5' },
        { name: 'Endodoncia: 1-6' },
        { name: 'Endodoncia: 1-7' },
        { name: 'Endodoncia: 1-8' },

        { name: 'Endodoncia: 2-1' },
        { name: 'Endodoncia: 2-2' },
        { name: 'Endodoncia: 2-3' },
        { name: 'Endodoncia: 2-4' },
        { name: 'Endodoncia: 2-5' },
        { name: 'Endodoncia: 2-6' },
        { name: 'Endodoncia: 2-7' },
        { name: 'Endodoncia: 2-8' },

        { name: 'Endodoncia: 3-1' },
        { name: 'Endodoncia: 3-2' },
        { name: 'Endodoncia: 3-3' },
        { name: 'Endodoncia: 3-4' },
        { name: 'Endodoncia: 3-5' },
        { name: 'Endodoncia: 3-6' },
        { name: 'Endodoncia: 3-7' },
        { name: 'Endodoncia: 3-8' },

        { name: 'Endodoncia: 4-1' },
        { name: 'Endodoncia: 4-2' },
        { name: 'Endodoncia: 4-3' },
        { name: 'Endodoncia: 4-4' },
        { name: 'Endodoncia: 4-5' },
        { name: 'Endodoncia: 4-6' },
        { name: 'Endodoncia: 4-7' },
        { name: 'Endodoncia: 4-8' },
      ])
      .execute();
      console.log('Tipos de tratamientos creados')

      //Crear los estados de tratamientos
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(TreatmentStatus)
        .values([
          { name: 'Activo', orderPriority: 1 },
          { name: 'Referido', orderPriority: 2 },
          { name: 'Finalizado', orderPriority: 3 }
        ])
        .execute();
      console.log('Estados de tratamientos creado')

    
    console.log('Proceso de seeding completado exitosamente');
  } catch (error) {
    console.error('Error durante el proceso de seeding:', error);
  } finally {
    // Cerrar la conexión
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Conexión a la base de datos cerrada');
    }
  }

}

// Ejecutar el script
main();
