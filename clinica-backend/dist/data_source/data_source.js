"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path = require("path");
const isCompiled = path.extname(__filename) === '.js';
const rootPath = isCompiled ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..');
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'astri',
    database: process.env.DB_DATABASE || 'clinica-db',
    entities: [path.join(rootPath, isCompiled ? '**/*.entity.js' : '**/*.entity.ts')],
    migrations: [path.join(rootPath, isCompiled ? 'migrations/*.js' : 'migrations/*.ts')],
    synchronize: false,
    logging: false,
});
exports.default = dataSource;
//# sourceMappingURL=data_source.js.map