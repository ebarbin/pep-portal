import { Problem } from './../../problem/problem.model';
import { Student } from './../../shared/student.model';
import { StudentService } from './../../shared/student.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-navigator',
  templateUrl: './course-navigator.component.html',
  styleUrls: ['./course-navigator.component.css']
})
export class CourseNavigatorComponent implements OnInit, OnDestroy {

  selectedProblem;
  student: Student;
  subs: Subscription;

  problems = [
    {id: 1, name: '1. Ejercicio'},
    {id: 2, name: '2. Ejercicio'},
    {id: 3, name: '3. Ejercicio'},
    {id: 4, name: '4. Ejercicio'},
    {id: 5, name: '5. Ejercicio'}
  ];

  constructor(private studentService: StudentService) { }

  selectProblem(problem: Problem) {
    this.selectedProblem = problem;
    this.studentService.updateSelectedProblem(problem).subscribe((student: Student) => {});
  }

  ngOnInit() {
    this.studentService.getStudent().subscribe((student: Student) => {
      this.student = student;
    });

    this.subs = this.studentService.courseSelectionChanged.subscribe((student: Student) => {
      this.student = student;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
