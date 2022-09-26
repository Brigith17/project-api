import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interface/User';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: CreateUserDto): Promise<UserInterface> {
    const existingUser = await this.userModel.findById(user._id).exec();
    if (existingUser) {
      return existingUser.updateOne(user);
    }
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // Delete User
  async deleteUser(userID: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(userID);
    return deletedUser;
  }

  // Put a single user
  async updateUser(
    userID: string,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDto,
      { new: true },
    );
    return updatedUser;
  }
}
