import { TestService } from './test.service';
import { Component } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '../../node_modules/@angular/common/http';
import { ResponseModel } from './response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  persons = [];
  person = null;

  constructor(private testService: TestService) {}

  onGetAll() {
    this.testService.getAll().subscribe((value: ResponseModel) => {
      this.persons = value.body;
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.error);
    });
  }

  onGetId(id: number) {
    this.testService.getById(id).subscribe((value: any) => {
      this.person = value;
    });
  }

  onPost(value: string) {
    this.testService.post(value).subscribe((val) => {
      console.log(val);
    });
  }

  onPut(value: string) {
    this.testService.put(this.person.id, value).subscribe((val) => {
      console.log(val);
    });
  }

  onDelete() {
    this.testService.delete(this.person.id).subscribe((val) => {
      console.log(val);
    });
  }
}
