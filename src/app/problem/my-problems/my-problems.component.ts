import { Problem } from './../problem.model';
import { ProblemService } from './../problem.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-problems',
  templateUrl: './my-problems.component.html',
  styleUrls: ['./my-problems.component.css']
})
export class MyProblemsComponent implements OnInit {

  problems: [Problem]

  constructor(private problemService: ProblemService) { }

  ngOnInit() {
    this.problemService.findAll().subscribe((problems: [Problem]) => {
      this.problems = problems;
    });
  }

}
