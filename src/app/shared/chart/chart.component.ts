import { Problem } from './../../problem/problem.model';
import { UserService } from './../../user/user.service';
import { CourseService } from './../../course/course.service';
import { Course } from './../../course/course.model';
import { ChartService } from './chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  courseSelected: Course;
  courses = [];

  studentsForCourse = {load: false, labels: [], data: []};
  stateStudentByProblemAndCourse = {load: false, labels: [], data: [],
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: '1=Correcto    |    -1=Incorrecto    |    0=Sin Resolver'
          },
        }],
        yAxes: [{
          display: true,
          ticks: {
              beginAtZero: false,
              steps: 1,
              stepSize: 1,
              max: 1,
              min: -1
          }
        }]
      }
    }
  };

  constructor(private userService: UserService, private courseService: CourseService, private chartService: ChartService) { }

  ngOnInit() {

    const user = this.userService.getStoredUser();

    this.courseService.findAll(user).subscribe((courses: [Course]) => {
      this.courses = courses;
      this.courseSelected = courses[0];

      this.stateStudentByProblemAndCourse.labels = this.courseSelected.problems.map((p: Problem) => {
        return p.name;
      });

      this.chartService.getProgressStudentsForCourse(this.courseSelected.id).subscribe((data: [any]) => {
        this.stateStudentByProblemAndCourse.data = data;
        this.stateStudentByProblemAndCourse.load = true;
      });

    });

    this.chartService.getStudentsForCourse().subscribe((data: [any]) => {
      this.studentsForCourse.labels = data.map((d: any) => {
        return d.courseName;
      });

      this.studentsForCourse.data = data.map((d: any) => {
        return d.quantity;
      });

      this.studentsForCourse.load = true;
    });
  }

  onCourseSelection() {
    this.stateStudentByProblemAndCourse.load = false;

    this.chartService.getProgressStudentsForCourse(this.courseSelected.id).subscribe((data: [any]) => {

      while (this.stateStudentByProblemAndCourse.labels.length) { this.stateStudentByProblemAndCourse.labels.pop(); }
      while (this.stateStudentByProblemAndCourse.data.length) { this.stateStudentByProblemAndCourse.data.pop(); }

      this.courseSelected.problems.forEach((p: Problem) => {
        this.stateStudentByProblemAndCourse.labels.push(p.name);
      });

      if (data.length > 0) {
        data.forEach((d: any) => {
          this.stateStudentByProblemAndCourse.data.push(d);
        });
        this.stateStudentByProblemAndCourse.load = true;
      }
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
