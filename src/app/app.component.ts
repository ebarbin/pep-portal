import { Person } from './person.model';
import { TestService } from './test.service';
import { Component } from '@angular/core';

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
    this.testService.getAll().subscribe((persons: Person[]) => {
      this.persons = persons;
    }, (error: any) => {
      console.log(error);
    });
  }

  onGetId(id: number) {
    this.testService.getById(id).subscribe((person: Person) => {
      this.person = person;
    }, (error: any) => {
      console.log(error);
    });
  }

  onPost(value: string) {
    this.testService.post(value).subscribe((val: any) => {
      console.log(val);
    }, (error: any) => {
      console.log(error);
    });
  }

  onPut(value: string) {
    this.testService.put(this.person.id, value).subscribe((val: any) => {
      console.log(val);
    }, (error: any) => {
      console.log(error);
    });
  }

  onDelete() {
    this.testService.delete(this.person.id).subscribe((val: any) => {
      console.log(val);
    }, (error: any) => {
      console.log(error);
    });
  }
}
