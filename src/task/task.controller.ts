import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from './constant';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(
    @Inject(TaskService)
    public taskService: TaskService,
  ) {}

  @Get()
  async getAllTask(@Query() taskFilterDto?: TaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(taskFilterDto);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return await this.taskService.createTask(taskDto);
  }

  @Put('/:id')
  async updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() taskDto: TaskDto,
  ): Promise<Task> {
    return await this.taskService.createTask(taskDto, id);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.taskService.updateTaskStatus(id, status);
  }
}
