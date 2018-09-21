import { Router } from '@angular/router';
import { PaginatorService } from './../../shared/paginator/paginator.service';
import { DialogService } from './../../dialog/dialog.service';
import { CorrectionService } from './../correction.service';
import { Correction } from './../correction.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-corrections',
  templateUrl: './my-corrections.component.html',
  styleUrls: ['./my-corrections.component.css']
})
export class MyCorrectionsComponent implements OnInit {

  filteredCorrections: Correction[] = [];
  corrections: Correction[] = [];

  constructor(private router: Router, private paginatorService: PaginatorService, private toastService: ToastrService,
    private dialogService: DialogService, private correctionService: CorrectionService) { }

  ngOnInit() {
    this.correctionService.getCorrections().subscribe((corrections: [Correction]) => {
      this.corrections = corrections;
    });
  }

  onPageChanged(data: [Correction]) {
    setTimeout(() => {
      this.filteredCorrections = data;
    }, 100);
  }

  openCorrectionPanel(correction: Correction) {
    this.correctionService.correction = correction;
    this.router.navigate(['home/make-correction']);

    /*this.dialogService.openCorrectionPanel(correction).then(() => {

      this.corrections = this.corrections.filter((c: Correction) => {
        return c.id !== correction.id;
      });

      this.filteredCorrections = this.filteredCorrections.filter((c: Correction) => {
        return c.id !== correction.id;
      });

      this.toastService.success('Corrección enviada.', 'Operación exitosa');

      if (this.corrections.length === 0) {
        this.toastService.warning('No hay correcciones por hacer.', 'Atención');
        this.router.navigate(['home/start']);
      } else {
        this.paginatorService.refresh.next({id: null, data: this.corrections});
      }

    }).catch(() => {});*/
  }
}
