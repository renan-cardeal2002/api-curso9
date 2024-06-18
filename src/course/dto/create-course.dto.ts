import { User } from 'src/resources/user/entities/user.entity';

export class CreateCourseDto {
  name: string;
  value: string;
  duration: string;
  students: User[];
}
