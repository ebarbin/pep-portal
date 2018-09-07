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

  studentsPerCourse = {
    load: false, labels: [], data: [],
    hide: function() {
      this.load = false;
    },
    update: function(data: [any]) {
      //Limpio los datos
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
    update: function(course: Course, data: [any]) {
      this.load = false;

      //Limpio los datos
      while (this.labels.length) { this.labels.pop(); }
      while (this.data.length) { this.data.pop(); }

      //Agrego los ejercicios al eje x
      course.problems.forEach((p: Problem) => {
        this.labels.push(p.name);
      });

      if (data.length > 0) {
        data.forEach((d: any) => {
          this.data.push(d);
        });

        //Actualizo el maximo del eje y
        let count = 0;
        this.data.forEach(element => {
          count = count + element.data[0];
        });
        this.options.scales.yAxes[0].ticks.max = count;

        this.load = true;
      }
    }
  };

  constructor(private userService: UserService, private courseService: CourseService, private chartService: ChartService) { }

  ngOnInit() {

    const user = this.userService.getStoredUser();

    this.courseService.findAll(user).subscribe((courses: [Course]) => {

      this.courses = courses;
      this.courseSelected = courses[0];

      this.chartService.getProgressStudentsPerCourse(this.courseSelected.id).subscribe((data: [any]) => {
        this.stateProblemsPerCourse.update(this.courseSelected, data);
      });
    });

    this.studentsPerCourse.hide();
    this.chartService.getStudentsPerCourse().subscribe((data: [any]) => {
      this.studentsPerCourse.update(data);
    });
  }

  onCourseSelection() {
    this.stateProblemsPerCourse.hide();
    this.chartService.getProgressStudentsPerCourse(this.courseSelected.id).subscribe((data: [any]) => {
      this.stateProblemsPerCourse.update(this.courseSelected, data);
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
