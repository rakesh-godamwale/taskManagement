import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './constant';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(taskFilterDto: TaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(taskFilterDto, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  createTask(taskDto: TaskDto, user: User, id?: string): Promise<Task> {
    return this.taskRepository.createTask(taskDto, user);
  }

  async deleteTask(id?: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`task with id ${id} not found`);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async uploadCsv(file): Promise<void> {
    const fileContent = file.buffer.toString();
    var totalRow = fileContent.split('\r\n');

    const result = totalRow.map((row) => {
      const rowData = row.split(',');
      return rowData;
    });
    const responseData = result.map((row) => {
      return {
        name: row[0],
        age: row[1],
        height: row[2],
      };
    });

    console.log(responseData);
  }
}
