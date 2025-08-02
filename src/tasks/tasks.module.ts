import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schema/tasks.schema';
import { VerifytokenMiddleware } from 'src/middlewares/verifytoken.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifytokenMiddleware).forRoutes("tasks");
  }
}
