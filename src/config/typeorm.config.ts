import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path'; 

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ecom',
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: true,
  migrationsRun: false,
};