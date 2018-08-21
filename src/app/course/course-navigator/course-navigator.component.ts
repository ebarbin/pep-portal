import { Problem } from './../../problem/problem.model';
import { Student } from './../../shared/student.model';
import { StudentService } from './../../shared/student.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
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

  @Output() problemSelection = new EventEmitter<Problem>();

  constructor(private studentService: StudentService) { }

  selectProblem(problem: Problem) {
    this.selectedProblem = problem;
    this.studentService.updateSelectedProblem(problem).subscribe((student: Student) => {
      this.problemSelection.emit(problem);
    });
  }

  ngOnInit() {
    this.studentService.getStudent().subscribe((student: Student) => {
      this.student = student;
      this.selectedProblem = this.student.selectedProblem;
    });

    this.subs = this.studentService.studentChanged.subscribe((student: Student) => {
      this.student = student;
      this.selectedProblem = this.student.selectedProblem;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
