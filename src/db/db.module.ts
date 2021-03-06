import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EmailEntity } from './entities/email.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        synchronize: true,
        entities: [EmailEntity],
        /* migrations: ['dist/db/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true, */
      }),
    }),
  ],
})
export class DbModule {}
