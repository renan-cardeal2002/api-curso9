import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { PersonalizadaException } from 'src/exception/personalizada.exception';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const createdCourse = new this.courseModel(createCourseDto);
      return createdCourse.save();
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async findAll(): Promise<Course[]> {
    try {
      return this.courseModel.find().exec();
    } catch (error) {
      throw new PersonalizadaException();
    }
  }

  async findById(id: string): Promise<Course> {
    try {
      return await this.courseModel.findById(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async findStudantsOfCourseByName(name: string): Promise<User[]> {
    try {
      return (await this.courseModel.findOne({ name })).students;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    try {
      return await this.courseModel.findByIdAndUpdate(id, updateCourseDto);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async remove(id: string): Promise<Course> {
    try {
      return await this.courseModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }
}
