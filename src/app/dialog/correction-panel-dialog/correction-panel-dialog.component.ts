import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Correction } from '../../correction/correction.model';

@Component({
  selector: 'app-correction-panel-dialog',
  templateUrl: './correction-panel-dialog.component.html',
  styleUrls: ['./correction-panel-dialog.component.css']
})
export class CorrectionPanelDialogComponent implements OnInit {

  @Input() correction: Correction;
  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: false, contextmenu: false};

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  public decline() {
    this.activeModal.close();
  }

  public accept() {
    this.activeModal.close();
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
