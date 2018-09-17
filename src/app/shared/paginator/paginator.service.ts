import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  refresh = new Subject<{id, data}>();
  constructor() { }
}
