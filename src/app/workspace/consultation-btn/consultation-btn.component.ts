import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../shared/dialog/dialog.service';
import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../shared/models/student.model';

@Component({
  selector: 'app-consultation-btn',
  templateUrl: './consultation-btn.component.html',
  styleUrls: ['./consultation-btn.component.css']
})
export class ConsultationBtnComponent implements OnInit {

  constructor(private dialogService: DialogService, private toastrService: ToastrService) { }

  @Input() student: Student;

  ngOnInit() {}

  onChatButtonClick() {
    this.dialogService.consultation(this.student, 'lg')
    .then((result: boolean) => {
      this.toastrService.success('Ya se ha enviado la consulta al docente.', 'Operación exitosa');
    });
  }
}
