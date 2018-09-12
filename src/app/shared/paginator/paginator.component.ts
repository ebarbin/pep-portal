import { PaginatorService } from './paginator.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input() rawData: any[];
  @Input() pageSize: number;
  @Input() id: string;

  @Output() pageChanged = new EventEmitter<any[]>();

  pages = [];
  pageQuantity;
  pageSelected = 0;

  subs: Subscription;

  constructor(private paginatorService: PaginatorService) { }

  ngOnInit() {
    this.pageQuantity = Math.ceil(this.rawData.length / this.pageSize);
    for (let i = 0; i < this.pageQuantity; i++) {
      this.pages.push(i);
    }
    this.filterdata();

    this.subs = this.paginatorService.previosPage.subscribe((id: string) => {
      if (this.id === id) {
        this.pageQuantity = Math.ceil((this.rawData.length - 1) / this.pageSize);
        this.pages = [];
        for (let i = 0; i < this.pageQuantity; i++) {
          this.pages.push(i);
        }
        this.previous();
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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
