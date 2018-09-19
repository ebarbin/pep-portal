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

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public checkView(url: string) {
    return this.url.includes(url);
  }

  public close() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
