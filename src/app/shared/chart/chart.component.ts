import { Student } from './../models/student.model';
import { StudentService } from './../services/student.service';
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

  courses = [];

  studentsPerCourse = {
    load: false, labels: [], data: [],
    hide: function() {
      this.load = false;
    },
    update: function(data: [any]) {

      while (this.labels.length) { this.labels.pop(); }
      while (this.data.length) { this.data.pop(); }

      this.labels = data.map((d: any) => {
        return d.courseName;
      });

      if (data.length > 0) {
        this.data = data.map((d: any) => {
          return d.quantity;
        });
        this.load = true;
      }
    }
  };

  stateProblemsPerCourse = {load: false, labels: [], data: [],
    courseSelected: null,
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Ejercicios'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Cantidad de Alumnos'
          },
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepSize: 1,
              max: 5
          }
        }]
      }
    },
    colors: [{ backgroundColor: 'rgba(6,255,0,1)'}, {backgroundColor: 'rgba(255,254,0,1)'}, {backgroundColor: 'rgba(255,0,0,1)'}],
    hide: function() {
      this.load = false;
    },
    update: function(data: [any]) {
      this.load = false;

      while (this.labels.length) { this.labels.pop(); }
      while (this.data.length) { this.data.pop(); }

      this.courseSelected.problems.forEach((p: Problem) => {
        this.labels.push(p.name);
      });

      if (data.length > 0) {
        data.forEach((d: any) => {
          this.data.push(d);
        });

        let count = 0;
        this.data.forEach(element => {
          count = count + element.data[0];
        });
        this.options.scales.yAxes[0].ticks.max = count;
        this.load = true;
      }
    }
  };

  stateStudentsPerCourse = {load: false, labels: [], data: [],
    courseSelected: null,
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Alumnos'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Cantidad de Ejercicios'
          },
          display: true,
          ticks: {
              beginAtZero: true,
              steps: 1,
              stepSize: 1,
              max: 5
          }
        }]
      }
    },
    colors: [{ backgroundColor: 'rgba(6,255,0,1)'}, {backgroundColor: 'rgba(255,254,0,1)'}, {backgroundColor: 'rgba(255,0,0,1)'}],
    hide: function() {
      this.load = false;
    },
    update: function(students: [Student], data: [any]) {
      this.load = false;

      while (this.labels.length) { this.labels.pop(); }
      while (this.data.length) { this.data.pop(); }

      students.forEach((student: Student) => {
        this.labels.push(student.user.name + ' ' + student.user.surename);
      });

      if (data.length > 0) {
        data.forEach((d: any) => {
          this.data.push(d);
        });

        this.options.scales.yAxes[0].ticks.max = this.courseSelected.problems.length;
        this.load = true;
      }
    }
  };

  constructor(private studentService: StudentService, private userService: UserService,
    private courseService: CourseService, private chartService: ChartService) { }

  ngOnInit() {

    const user = this.userService.getStoredUser();

    this.courseService.findAll(user).subscribe((courses: [Course]) => {

      this.courses = courses;

      this.stateProblemsPerCourse.courseSelected = courses[0];
      this.chartService.getProgressStudentsPerCourse(courses[0].id).subscribe((data: [any]) => {
        this.stateProblemsPerCourse.update(data);
      });

      this.stateStudentsPerCourse.courseSelected = courses[0];
      this.studentService.getStudentsByCourseId(courses[0].id).subscribe((students: [Student]) => {
        this.chartService.getTotalProgressStudentsPerCourse(courses[0].id).subscribe((data: [any]) => {
          this.stateStudentsPerCourse.update(students, data);
        });
      });
    });

    this.studentsPerCourse.hide();
    this.chartService.getStudentsPerCourse().subscribe((data: [any]) => {
      this.studentsPerCourse.update(data);
    });
  }

  onCourseSelection1() {
    this.stateProblemsPerCourse.hide();
    this.chartService.getProgressStudentsPerCourse(this.stateProblemsPerCourse.courseSelected.id).subscribe((data: [any]) => {
      this.stateProblemsPerCourse.update(data);
    });
  }

  onCourseSelection2() {
    this.stateStudentsPerCourse.hide();
    this.studentService.getStudentsByCourseId(this.stateStudentsPerCourse.courseSelected.id).subscribe((students: [Student]) => {
      this.chartService.getTotalProgressStudentsPerCourse(this.stateStudentsPerCourse.courseSelected.id).subscribe((data: [any]) => {
        this.stateStudentsPerCourse.update(students, data);
      });
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

   // events
   public chartClicked(e: any): void {
    console.log(e.active[0]._model);
  }
}
