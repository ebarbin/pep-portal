import { Teacher } from './../../shared/models/teacher.model';
import { Course } from './../../course/course.model';
import { Student } from '../../shared/models/student.model';
import { Problem } from '../../problem/problem.model';

export class Consultation {
  constructor(public id: string, public consultation: string, public student: Student,
    public course: Course, public problem: Problem, public wasReadedByTeacher: boolean,
    public wasReadedByStudent: boolean, public teacher: Teacher,
    public teacherResponse: string, public code: string, public creationDate: Date) {}
}
