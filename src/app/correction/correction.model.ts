import { Course } from './../course/course.model';
import { Teacher } from './../shared/models/teacher.model';
import { Student } from './../shared/models/student.model';
import { WorkspaceProblem } from './../workspace/models/workspace-problem.model';

export class Correction {
  constructor(public id: string, public student: Student, public teacher: Teacher,
     public course: Course, public workspaceProblem: WorkspaceProblem, public wasReadedByTeacher: boolean) {}
}
