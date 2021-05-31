import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    MulterModule.register({}),
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ],

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
