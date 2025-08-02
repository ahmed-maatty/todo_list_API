import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tasksDTOS } from './dtos/tasks.dtos';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async getAllTasksLogic() {
    return await this.taskModel.find();
  }

  async getSpecificTaskLogic(id: number) {
    return await this.taskModel.findById(id)
  }

  async createTaskLogic(taskInfo: tasksDTOS, userId: string) {
    const { title, description } = taskInfo;
    const task = await this.taskModel.create({
      title,
      description,
      time: Date.now(),
      task_owner: userId
    });
    await this.userModel.findByIdAndUpdate(userId, { $push: { tasks: task.id } })
    return task
  }
}
