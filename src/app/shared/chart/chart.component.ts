import { ChartService } from './chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';



  studentsForCourse = {load: false, labels: [], studentQuantity: []};

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.getStudentsForCourse().subscribe((data: [any]) => {
      this.studentsForCourse.labels = data.map((d: any) => {
        return d.courseName;
      });

      this.studentsForCourse.studentQuantity = data.map((d: any) => {
        return d.studentQuantity;
      });

      this.studentsForCourse.load = true;
    });
  }


    // events
    public chartClicked(e: any): void {
      console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }
}
