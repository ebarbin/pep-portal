import { User } from '../../user/user.model';
import { Course } from '../../course/course.model';
import { Problem } from '../../problem/problem.model';
export class Student {
  constructor(public id: string, public instituteId: string, public user: User,
    public documentType: string, public documentNumber: string,
    public selectedCourse: Course, public selectedProblem: Problem) {}
}
