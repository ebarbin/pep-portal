import { Consultation } from './../models/consultation.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comunication'
})
export class ComunicationPipe implements PipeTransform {

  transform(values: [Consultation], args?: any): any {
    return values.filter((val: Consultation) => {
      if (val.problem == null) {
        return true;
      } else {
        return false;
      }
    });
  }

}
