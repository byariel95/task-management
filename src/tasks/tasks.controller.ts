import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './task-status.enum';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Auth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    };

  @Get(':id')
    getTaskById(@Param('id',ParseIntPipe) id : number ): Promise<Task> {
        return this.tasksService.getTaskById(id);
    };

  @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto):Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    };

  @Delete(':id')
    deleteTAsk(@Param('id',ParseIntPipe) id : number ): Promise<void>{
        return this.tasksService.deleteTask(id);
    };

  @Patch(':id')
    updateTask(@Param('id',ParseIntPipe) id : number, @Body('status',TaskStatusValidationPipe) status : TaskStatus) : Promise<Task>{
        return this.tasksService.updateTask(id,status);
    };
  
}
