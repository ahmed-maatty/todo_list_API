import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from "./schema/user.schema"
import { Model } from 'mongoose';
import { loginDto, registerDto } from './dtos/auth.dtos';
import { InvalidEmailOrPassException } from './exceptions/exception';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createUserService(userData: registerDto) {

    const { firstName, lastName, email, password } = userData;

    const isUserExist = await this.userModel.exists({ email });

    if (isUserExist) {
      throw new BadRequestException("User Already Exist");
    }

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await this.userModel.create({
      firstName,
      lastName,
      fullName: firstName + lastName,
      email,
      password: hashedPassword
    });

    return newUser;
  }

  async loginLogic(userData: loginDto) {
    const { email, password } = userData;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new InvalidEmailOrPassException;
    }

    const isPasswordMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new InvalidEmailOrPassException;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });

    return { message: `Welcome Back ${user.fullName}`, token }
  }
}
