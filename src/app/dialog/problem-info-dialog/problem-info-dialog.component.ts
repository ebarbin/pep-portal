import { Problem } from './../../problem/problem.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-problem-info-dialog',
  templateUrl: './problem-info-dialog.component.html',
  styleUrls: ['./problem-info-dialog.component.css']
})
export class ProblemInfoDialogComponent implements OnInit {

  @Input() problem: Problem;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

}
