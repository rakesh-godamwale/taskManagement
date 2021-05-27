import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../constant';

export class TaskFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
