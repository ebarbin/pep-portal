import { Course } from './../course/course.model';
import { Student } from './../shared/models/student.model';
import { Problem } from '../problem/problem.model';
export class Workspace {
  constructor(public id: string, public student: Student, public course: Course, public problem: Problem, public solution: string) {}
}
