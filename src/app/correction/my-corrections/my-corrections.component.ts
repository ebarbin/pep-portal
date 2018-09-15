import { CorrectionService } from './../correction.service';
import { Correction } from './../correction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-corrections',
  templateUrl: './my-corrections.component.html',
  styleUrls: ['./my-corrections.component.css']
})
export class MyCorrectionsComponent implements OnInit {

  filteredCorrections: Correction[] = [];
  corrections: Correction[] = [];

  constructor(private correctionService: CorrectionService) { }

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
}
