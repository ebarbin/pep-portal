import { Primitive } from './../primitive/primitive.model';
export class Problem {
  constructor(public id: string, public name: string,
    public teacher: string, public explanation: string, public teacherSolucion: string,
    public primitives: [Primitive], public preExecution: string, public posExecution: string) {}
}
