import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import multer from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
