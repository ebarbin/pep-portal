import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(role: string, args?: any): any {
    if (role === 'ROLE_TEACHER') {
      return  'Docente';
    } else if (role === 'ROLE_STUDENT') {
      return  'Alumno';
    }
    return '';
  }
}
