import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() numberPages: number;
  @Input() sizePage: number;
  @Input() selectedPage: number;
  @Output() changePage = new EventEmitter<number>();

  constructor() { }

  public changeNumberPage(pageNew: number): void {
    this.changePage.emit(pageNew);
  }

  ngOnInit(): void {
  }

}
