import { TestService } from './test.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private testService: TestService) {}

  onTest() {
    this.testService.test();
  }
}
