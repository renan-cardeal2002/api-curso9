import { User } from 'src/user/entities/user.entity';

export class CreateCourseDto {
  name: string;
  value: string;
  duration: string;
  students: User[];
}
