import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { CSVModule } from './CSV/csv.module';
import { TaskModule } from './task/task.module';
import { GCloudStorageModule } from '@aginix/nestjs-gcloud-storage';

@Module({
  imports: [
    GCloudStorageModule.withConfig({
      defaultBucketname: 'task-management',
      storageBaseUri: 'https://storage.googleapis.com/task-management',
      // predefinedAcl: 'private', // Default is publicRead
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.stage.dev'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          DB_HOST: 'localhost',
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
    TaskModule,
    CSVModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
