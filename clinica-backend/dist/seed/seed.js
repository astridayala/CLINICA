"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'clinica-db',
    entities: [users_entity_1.User],
    synchronize: false,
});
async function main() {
    console.log('Iniciando proceso de seeding...');
    try {
        await dataSource.initialize();
        console.log('Conexión a la base de datos establecida');
        const adminPassword = await bcrypt.hash('astri10', 10);
        const doctorPassword = await bcrypt.hash('gus712026', 10);
        console.log('Creando usuarios iniciales...');
        await dataSource
            .createQueryBuilder()
            .insert()
            .into(users_entity_1.User)
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
        await dataSource
            .createQueryBuilder()
            .insert()
            .into(users_entity_1.User)
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
    }
    catch (error) {
        console.error('Error durante el proceso de seeding:', error);
    }
    finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Conexión a la base de datos cerrada');
        }
    }
}
main();
//# sourceMappingURL=seed.js.map