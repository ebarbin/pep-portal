import { Course } from './course.model';
import { Student } from './../shared/models/student.model';

export class Inscription {
  constructor(public id: string, public student: Student, public course: Course, public inscriptionDate: Date) {}
}
