import { Subject, Subscription } from 'rxjs';
import { Student } from './../shared/student.model';
import { StudentService } from './../shared/student.service';
import { ProblemService } from './../problem/problem.service';
import { Problem } from './../problem/problem.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  solution = '';
  student: Student;
  subs: Subscription;

  constructor(private studentService: StudentService, private problemService: ProblemService) { }

  ngOnInit() {
    this.studentService.getStudent().subscribe((student: Student) => {
      this.student = student;
      this.solution = student.selectedProblem ? student.selectedProblem.solution : '';
    });

    this.subs = this.studentService.studentChanged.subscribe((student: Student) => {
      this.student = student;
      this.solution = student.selectedProblem ? student.selectedProblem.solution : '';
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  update() {
    if (this.student && this.student.selectedProblem) {
      this.student.selectedProblem.solution = this.solution;
      this.problemService.updateProblemSolution(this.student.selectedProblem).subscribe();
    }
  }
}
