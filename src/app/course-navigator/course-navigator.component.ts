import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-navigator',
  templateUrl: './course-navigator.component.html',
  styleUrls: ['./course-navigator.component.css']
})
export class CourseNavigatorComponent implements OnInit {

  selected;

  problems = [
    {id: 1, name: '1. Ejercicio'},
    {id: 2, name: '2. Ejercicio'},
    {id: 3, name: '3. Ejercicio'},
    {id: 4, name: '4. Ejercicio'},
    {id: 5, name: '5. Ejercicio'}
  ];

  constructor() { }

  selectProblem(problem: {id: number, name: string}) {
    this.selected = problem.id;
  }

  ngOnInit() {
  }

}
