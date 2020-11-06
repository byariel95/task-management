import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task-status.enum'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
    ){}


  async getTasks(filterDto: GetTaskFilterDto) :Promise<Task[]> {
      return this.taskRepository.getTasks(filterDto);
  };    

  async getTaskById (id: number) : Promise<Task> 
  {

      const found = await this.taskRepository.findOne(id);

      if (!found) {
          throw new NotFoundException(`task with  id ${id} not found`);
      }
      return found;
  };

  async createTask(createTaskDto: CreateTaskDto) : Promise<Task>
  {
      return this.taskRepository.createTask(createTaskDto);
  };

  async deleteTask(id: number): Promise<void>{
      const found = await this.taskRepository.delete(id);
      if(found.affected === 0){
          throw new NotFoundException(`task with  id ${id} not found`);
      }

  };

  async updateTask(id : number, status: TaskStatus): Promise<Task> {
      const task = await this.getTaskById(id);
      task.status = status;
      await task.save();
      return task;       
  }
}
