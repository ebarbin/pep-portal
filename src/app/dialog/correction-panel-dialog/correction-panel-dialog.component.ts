import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Correction } from '../../correction/correction.model';
import { CorrectionService } from '../../correction/correction.service';

@Component({
  selector: 'app-correction-panel-dialog',
  templateUrl: './correction-panel-dialog.component.html',
  styleUrls: ['./correction-panel-dialog.component.css']
})
export class CorrectionPanelDialogComponent implements OnInit {

  @Input() correction: Correction;

  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: false, contextmenu: false};
  state;

  constructor(private correctionService: CorrectionService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.correction.workspaceProblem.state = 'FEEDBACK';
    this.correction.workspaceProblem.feedback = null;
  }

  public close() {
    this.activeModal.dismiss();
  }

  public send() {
    this.correctionService.sendCorrection(this.correction).subscribe(() => {
      this.activeModal.close();
    });
  }
}
