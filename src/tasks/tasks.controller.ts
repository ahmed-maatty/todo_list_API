import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { taskEditsDTOS, tasksDTOS } from './dtos/tasks.dtos';
import { Request } from 'express';


@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) { }

  @Get()
  async getTasks() {
    return await this.taskServices.getAllTasksLogic();
  }
  @Get(":id")
  async getSpecificTask(@Param("id", ParseIntPipe) id: number) {
    return await this.taskServices.getSpecificTaskLogic(id);
  }

  @Post("create")
  async createTask(@Body() taskInfo: tasksDTOS, @Req() req: Request) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return await this.taskServices.createTaskLogic(taskInfo, userId)
  }

  @Put(":id")
  async editTask(@Body() editsInfo: taskEditsDTOS, @Param("id") id: string , @Req() req : Request) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return await this.taskServices.editTaskLogic(id, editsInfo , userId);
  }

  @Delete(":id")
  async deleteTask(@Param("id") id : string , @Req() req : Request) {
    const userId = (req as Request & {user : {id :string}}).user.id
    return await this.taskServices.deleteTask(id , userId)
  }
}