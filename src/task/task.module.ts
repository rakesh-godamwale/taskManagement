import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
