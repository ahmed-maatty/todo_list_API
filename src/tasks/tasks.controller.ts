import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices : TasksService){}
  @Get()
  getTasks(){
    return "all tasks";
  }
}
