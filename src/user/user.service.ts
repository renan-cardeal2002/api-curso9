import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly courseService: CourseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async findByUser(name: string, password: string): Promise<User> {
    try {
      return await this.userModel.findOne({ name, password }).exec();
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    }
    catch (error) {
      throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }

  async registrationStudantCourse(idStudant: string, idCourse: string) {
    const course = await this.courseService.findById(idCourse);
    const studant = await this.findById(idStudant);
    course.students.push(studant);
    await this.courseService.update(idCourse, course);
  }
}
