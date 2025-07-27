import { UnauthorizedException } from "@nestjs/common";

export class InvalidEmailOrPassException extends UnauthorizedException {
  constructor(){
    super("Invalid Email Or Password")
  }
}