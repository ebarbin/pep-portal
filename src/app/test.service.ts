import { ResponseModel } from './response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('pep-api/person');
  }

  getById(id: number) {
    return this.httpClient.get('pep-api/person/' + id);
  }

  post(value: string) {
    return this.httpClient.post('pep-api/person', value);
  }

  delete(id: number) {
    return this.httpClient.delete('pep-api/person/' + id);
  }

  put(id: number, name: string) {
    return this.httpClient.put('pep-api/person/' + id, name);
  }
}
