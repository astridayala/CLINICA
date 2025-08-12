import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/users.entity';

// Crear una instancia de DataSource directamente en el script
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'clinica-db',
  entities: [User], // Incluir todas las entidades relacionadas
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
    
    // Crear usuario analista
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
