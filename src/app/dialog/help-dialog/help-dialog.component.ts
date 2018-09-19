import { UserService } from './../../user/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {

  @Input() url: string;
  title: string;

  constructor(private userService: UserService, private activeModal: NgbActiveModal) { }

  ngOnInit() {

    const user = this.userService.getStoredUser();

    if (this.url.includes('/home/start')) {
      this.title = 'Bienvenido/a';
    } else if (this.url.includes('/home/workspace')) {
      this.title = 'Area de Trabajo';
    } else if (this.url.includes('/home/course/list')) {
      this.title = 'Mis Cursos';
    } else if (this.url.includes('/home/student-consultations')) {
      this.title = 'Mis Consultas';
    } else if (this.url.includes('/home/teacher-consultations')) {
      this.title = 'Mis Consultas';
    } else if (this.url.includes('/home/account')) {
      this.title = 'Cuenta';
    } else if (this.url.includes('/home/change-password')) {
      this.title = 'Cambio de Contraseña';
    } else if (this.url.includes('/home/profile-image')) {
      this.title = 'Imagen de Perfil';
    } else if (this.url.includes('/home/problem/list')) {
      this.title = 'Mis Ejercicios';
    } else if (this.url.includes('/home/new-problem')) {
      this.title = 'Crear Ejercicios';
    } else if (this.url.includes('/home/edit-problem')) {
      this.title = 'Editar Ejercicio';
    } else if (this.url.includes('/home/primitive/list')) {
      this.title = 'Mis Primitivas';
    } else if (this.url.includes('/home/new-primitive')) {
      this.title = 'Crear Primitiva';
    } else if (this.url.includes('/home/edit-primitive')) {
      this.title = 'Editar Primitiva';
    } else if (this.url.includes('/home/chart')) {
      this.title = 'Panel de Gráficos';
    }
  }

  public checkView(url: string) {
    return url.includes('/home/start');
  }

  public close() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
