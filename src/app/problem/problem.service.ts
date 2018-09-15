import { WorkspaceProblem } from './../workspace/models/workspace-problem.model';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { CustomResponse } from '../shared/custom-response.model';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Problem } from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private studentService: StudentService, private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get('pep-api/problem')
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }

  deleteById(problemId: string) {
    return this.httpClient.delete('pep-api/problem/' + problemId)
    .pipe(
      map((response: CustomResponse) => {
        return response.body;
      })
    );
  }

  findByNameLike(text: string) {
    return this.httpClient.get('pep-api/problem/like?nameSearch=' + text)
      .pipe(
        map((response: CustomResponse) => {
          return <[Problem]> response.body;
        })
      );
  }

  findById(problemId: string) {
    return this.httpClient.get('pep-api/problem/' + problemId)
      .pipe(
        map((response: CustomResponse) => {
          return <Problem> response.body;
        })
      );
  }

  createProblem(problem: Problem) {
    return this.httpClient.post('pep-api/problem', problem)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  editeProblem(problem: Problem) {
    return this.httpClient.put('pep-api/problem/' + problem.id, problem)
      .pipe(
        map((response: CustomResponse) => {
          return response.body;
        })
      );
  }

  updateProblemSolution(problem: Problem) {
    return this.httpClient.put('pep-api/problem/update-solution/' + problem.id, problem)
      .pipe(
        map((response: CustomResponse) => {
          const student: Student = <Student> response.body;
          this.studentService.storeStudent(student);
          return student;
        })
      );
  }

  getStaticPreExecution() {
    const context = 'var __result = {logs: [], state: false, message: ""};\n';

    return context + 'var log = function(value) {__result.logs.push(JSON.stringify(value));}\n';
  }

  getStaticPosExecution() {

    return '\nreturn __result;';
  }

  getSuggestedPreExecution() {

    return '// Ingrese cualquier elemento(variable, función, etc) que desea poner a disposición del alumno.';
  }

  getSuggestedExplanation() {
    let description = '# Complete con el enunciado del ejercicio. <br>';
    description = description + '# Temas que aborda el ejercicio. <br>';
    description = description + '# Ayudas o tips para el alumno. <br>';

    return description + '# Primitivas disponibles.';
  }

  getSuggestedPosExecution() {
    let context = '// Ingrese la función que valide automaticamente el ejercicio o indique validación manual\n\n';
    context = context + '// Para validación manual\n';
    context = context + '__result.state = null;\n\n';
    context = context + '// Para  salida incorrecta\n';
    context = context + '// __result.state = false;\n';
    context = context + '// __result.message = "<Aquí el mensaje de error que se quiera mostrar>";\n\n';
    context = context + '// Para  salida correcta\n';
    context = context + '// __result.state = true;\n';
    context = context + '// __result.message = "<Aquí el mensaje de solución exitosa>";\n';

    return context;
  }

  getExecutionContext(debug: boolean, workspaceProblem: WorkspaceProblem) {
    let executionContext = this.getStaticPreExecution();

    workspaceProblem.problem.primitives.forEach( (primitive) => {
      executionContext = executionContext + primitive.code + '\n';
    });

    if (workspaceProblem.problem.preExecution) {
      executionContext = executionContext + workspaceProblem.problem.preExecution + '\n';
    }
    if (workspaceProblem.solution) {
      executionContext = executionContext + workspaceProblem.solution + '\n';
    }

    if (!debug) {
      if (workspaceProblem.problem.posExecution) {
        executionContext = executionContext + workspaceProblem.problem.posExecution;
      }
    }

    return executionContext + this.getStaticPosExecution();
  }
}
