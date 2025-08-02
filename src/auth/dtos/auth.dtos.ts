/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class registerDto {
  @IsNotEmpty({ message: "Please, Enter Your First Name." })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: "Please, Enter Your Last Name." })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: "Please, Enter Your Email." })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Please, Enter A Password" })
  password: string;
}

export class loginDto {
  @IsNotEmpty({ message: "Pleaser, Enter Your Email." })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: "Please, Enter Your Password" })
  password: string;
}