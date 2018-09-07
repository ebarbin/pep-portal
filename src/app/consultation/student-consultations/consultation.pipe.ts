import { Consultation } from './../models/consultation.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consultation'
})
export class ConsultationPipe implements PipeTransform {

  transform(values: [Consultation], args?: any): any {
    return values.filter((val: Consultation) => {
      if (val.problem) {
        return true;
      } else {
        return false;
      }
    });
  }

}
