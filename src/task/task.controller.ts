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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto, UpdateTaskStatusDto } from './dto/task.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

@ApiTags('Task')
@UseGuards(AuthGuard())
@Controller('task')
export class TaskController {
  constructor(
    @Inject(TaskService)
    public taskService: TaskService,
  ) {}

  @Get()
  async getAllTask(
    @Query() taskFilterDto: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(taskFilterDto, user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() taskDto: TaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskService.createTask(taskDto, user);
  }

  @Put('/:id')
  async updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() taskDto: TaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.taskService.createTask(taskDto, user, id);
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
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.taskService.updateTaskStatus(id, status, user);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return file;
  }
}
