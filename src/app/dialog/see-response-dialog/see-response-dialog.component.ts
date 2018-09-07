import { Consultation } from './../../consultation/models/consultation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-see-response-dialog',
  templateUrl: './see-response-dialog.component.html',
  styleUrls: ['./see-response-dialog.component.css']
})
export class SeeResponseDialogComponent implements OnInit {

  @Input() consultation: Consultation;
  title = 'Respuesta';

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (!this.consultation.problem) {
      this.title = 'Comunicado';
    }
  }

  public decline() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
