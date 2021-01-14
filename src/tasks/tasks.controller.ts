import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './task-status.enum';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Auth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto,@GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto,user);
    };

  @Get(':id')
    getTaskById(@Param('id',ParseIntPipe) id : number, @GetUser() user: User ): Promise<Task> {
        return this.tasksService.getTaskById(id,user);
    };

  @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto, @GetUser() user:User):Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    };

  @Delete(':id')
    deleteTAsk(@Param('id',ParseIntPipe) id : number, @GetUser() user:User): Promise<void>{
        return this.tasksService.deleteTask(id, user);
    };

  @Patch(':id')
    updateTask(@Param('id',ParseIntPipe) id : number, @Body('status',TaskStatusValidationPipe) status : TaskStatus, @GetUser() user:User) : Promise<Task>{
        return this.tasksService.updateTask(id,status,user);
    };
  
}
