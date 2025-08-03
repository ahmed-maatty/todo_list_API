import { IsNotEmpty } from "class-validator";

export class tasksDTOS {
  @IsNotEmpty({ message: "Please, Enter Task Title." })
  title: string;
  @IsNotEmpty({ message: "Please, Enter Task Description." })
  description: string;
}

export class taskEditsDTOS{
  title:string;
  description:string;
  time:Date;
}