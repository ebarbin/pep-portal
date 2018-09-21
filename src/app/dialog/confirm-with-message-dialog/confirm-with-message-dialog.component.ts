import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-with-message-dialog',
  templateUrl: './confirm-with-message-dialog.component.html',
  styleUrls: ['./confirm-with-message-dialog.component.css']
})
export class ConfirmWithMessageDialogComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.dismiss();
  }

  public onSubmit(form: NgForm) {
    this.activeModal.close(<string> form.value.feedback);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
