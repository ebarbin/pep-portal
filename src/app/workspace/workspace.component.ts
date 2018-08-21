import { Problem } from './../problem/problem.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  solution;

  constructor() { }

  ngOnInit() {
  }

  anda() {
    console.log(this.solution)
  }

  onSelectedProblem(problem: Problem) {
    console.log(problem);
  }
}
