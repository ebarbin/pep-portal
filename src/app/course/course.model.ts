import { Teacher } from './../shared/teacher.model';
import { Problem } from './../problem/problem.model';
export class Course {

  constructor(public id: string, public name: string, public description: string,
    public code: string, public problems: [Problem], public instituteId: string, public teacher: Teacher) {}
}
