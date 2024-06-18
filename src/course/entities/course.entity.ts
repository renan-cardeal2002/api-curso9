import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/resources/user/entities/user.entity';

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  duration: string;

  @Prop()
  students: User[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
