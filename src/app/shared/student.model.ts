import { User } from './../user/user.model';
import { Course } from '../course/course.model';
export class Student {
  constructor(public id: string, public instituteId: string, public user: User,
    public documentType: string, public documentNumber: string, public courses: [Course],
    public selectedCourse: Course) {}
}
