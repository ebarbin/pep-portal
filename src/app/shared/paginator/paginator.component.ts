import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() rawData: any[];
  @Output() pageChanged = new EventEmitter<any[]>();

  pages = [];
  pageSize = 5;
  pageQuantity;
  pageSelected = 0;

  constructor() { }

  ngOnInit() {
    this.pageQuantity = Math.ceil(this.rawData.length / this.pageSize);
    for (let i = 0; i < this.pageQuantity; i++) {
      this.pages.push(i);
    }
    this.filterdata();
  }

  selectPage(page: number) {
    this.pageSelected = page;
    this.filterdata();
  }

  previous() {
    this.pageSelected--;
    this.filterdata();
  }

  next() {
    this.pageSelected++;
    this.filterdata();
  }

  private filterdata() {
    let init = 0;
    if (this.pageSelected !== 0) {
      init = this.pageSelected * this.pageSize;
    }
    this.pageChanged.emit(this.rawData.slice(init,
      (this.pageSelected * this.pageSize) + this.pageSize));
  }
}
