import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-see-consultation-dialog',
  templateUrl: './see-consultation-dialog.component.html',
  styleUrls: ['./see-consultation-dialog.component.css']
})
export class SeeConsultationDialogComponent implements OnInit {

  @Input() consultation: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

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
