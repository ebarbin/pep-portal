import { DialogService } from './../../dialog/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Correction } from './../correction.model';
import { CorrectionService } from './../correction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-correction',
  templateUrl: './make-correction.component.html',
  styleUrls: ['./make-correction.component.css']
})
export class MakeCorrectionComponent implements OnInit {

  correction: Correction;
  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: false, contextmenu: false};
  state;

  constructor(private dialogService: DialogService,
    private toastService: ToastrService,
    private router: Router,
    private correctionService: CorrectionService) { }

  ngOnInit() {
    if (!this.correctionService.correction) {
      this.router.navigate(['home/corrections']);
    }
    this.correction = this.correctionService.correction;
    this.correction.workspaceProblem.state = 'FEEDBACK';
    this.correction.workspaceProblem.feedback = null;
  }

  public cancel() {
    this.router.navigate(['home/corrections']);
  }

  public sendOK() {
    this.dialogService.confirm('Atención', '¿Confirma calificacion satisfactoria?', 'Si', 'No')
    .then((result: boolean) => {
      if (result) {
        this.correction.workspaceProblem.state = 'OK';
        this.correctionService.sendCorrection(this.correction).subscribe((corrections: [Correction]) => {
          if (corrections.length > 0) {
            this.toastService.success('Corrección enviada.', 'Operación exitosa');
            this.router.navigate(['home/corrections']);
          } else {
            this.toastService.success('Corrección enviada. Ya no quedan correcciones por hacer.', 'Operación exitosa');
            this.router.navigate(['home/start']);
          }
          this.correctionService.correction = null;
          this.correctionService.correctionsChanges.next(corrections.length);
        });
      }
    }).catch(() => {});
  }

  public sendNOOK() {
    this.dialogService.confirmWithMessage()
    .then((feedback: string) => {
      this.correction.workspaceProblem.state = 'NOOK';
        this.correction.workspaceProblem.feedback = feedback;
        this.correctionService.sendCorrection(this.correction).subscribe((corrections: [Correction]) => {
          if (corrections.length > 0) {
            this.toastService.success('Corrección enviada.', 'Operación exitosa');
            this.router.navigate(['home/corrections']);
          } else {
            this.toastService.success('Corrección enviada. Ya no quedan correcciones por hacer.', 'Operación exitosa');
            this.router.navigate(['home/start']);
          }
          this.correctionService.correction = null;
          this.correctionService.correctionsChanges.next(corrections.length);
        });
    }).catch(() => {});
  }
}
