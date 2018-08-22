import { Problem } from './../../problem/problem.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-problem-explanation',
  templateUrl: './problem-explanation.component.html',
  styleUrls: ['./problem-explanation.component.css']
})
export class ProblemExplanationComponent implements OnInit {

  constructor() { }

  showProblemExplanation = true;
  @Input() problem: Problem;

  ngOnInit() {
  }

}
