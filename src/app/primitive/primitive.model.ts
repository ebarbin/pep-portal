import { Teacher } from './../shared/models/teacher.model';
export class Primitive {
  constructor(public id: string, public name: string, public teacher: Teacher, public description: string, public code: string) {}
}
