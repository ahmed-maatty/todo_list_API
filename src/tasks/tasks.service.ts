import { Injectable } from '@nestjs/common';
import { Task } from './schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor (
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) { }
}
