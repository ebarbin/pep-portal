import { TeacherResponse } from './teacher-response.model';
import { Student } from './../shared/models/student.model';

export class Consultation {
  constructor(public id: string, public consultation: string, public student: Student,
    public wasReaded: boolean, public teacherResponse: TeacherResponse, public creationDate: Date) {}
}
