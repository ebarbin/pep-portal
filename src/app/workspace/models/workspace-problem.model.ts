import { Problem } from '../../problem/problem.model';

export class WorkspaceProblem {
  constructor(public problem: Problem, public active: boolean, public solution: string,
    public state: string, public feedback: string) {}
}
