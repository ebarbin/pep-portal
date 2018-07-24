import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  test() {
    this.httpClient.get('pep-api/person').subscribe((response: any) => {
      console.log(response);
    });
  }
}
