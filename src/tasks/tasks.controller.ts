import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { tasksDTOS } from './dtos/tasks.dtos';
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
  async editTask() {

  }

  @Delete("id")
  async deleteTask() {

  }
}