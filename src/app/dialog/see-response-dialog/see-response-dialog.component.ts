import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-see-response-dialog',
  templateUrl: './see-response-dialog.component.html',
  styleUrls: ['./see-response-dialog.component.css']
})
export class SeeResponseDialogComponent implements OnInit {

  @Input() response: string;

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
