import { Primitive } from './../primitive/primitive.model';
export class Problem {
  constructor(public id: string, public name: string, public instituteId: string,
    public teacher: string, public explanation: string, public solution: string,
    public primitives: [Primitive], public preExecution: string, public posExecution: string) {}
}
