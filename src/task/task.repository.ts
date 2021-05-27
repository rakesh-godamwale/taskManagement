import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './constant';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './entity/task.entity';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(taskFilterDto: TaskFilterDto): Promise<Task[]> {
    const { search, status } = taskFilterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    const { title, description } = taskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
