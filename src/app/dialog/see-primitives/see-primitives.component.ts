import { WorkspaceProblem } from './../../workspace/models/workspace-problem.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-see-primitives',
  templateUrl: './see-primitives.component.html',
  styleUrls: ['./see-primitives.component.css']
})
export class SeePrimitivesComponent implements OnInit {

  @Input() workspaceProblem: WorkspaceProblem;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

}
