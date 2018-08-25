import { WorkspaceProblem } from './workspace-problem.model';
import { Course } from '../../course/course.model';
import { Student } from '../../shared/models/student.model';

export class Workspace {
  constructor(public id: string, public student: Student, public course: Course,
    public problems: [WorkspaceProblem], public solution: string) {}
}
