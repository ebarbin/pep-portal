import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { Primitive } from '../../../primitive/primitive.model';

@Component({
  selector: 'app-primitive-info',
  templateUrl: './primitive-info.component.html',
  styleUrls: ['./primitive-info.component.css']
})
export class PrimitiveInfoComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'javascript', readOnly: true};

  @Input() primitive: Primitive;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }
}
