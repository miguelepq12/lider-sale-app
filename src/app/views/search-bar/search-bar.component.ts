import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  showSearchList: boolean;
  routerUrl: string;
  searchText: string;
  @Output() searchQuery = new EventEmitter<string>();

  constructor() { }

  public showListSearch(textSearch: string): void {
    this.showSearchList = textSearch.length > 0;
  }

  public initParams(): void {

  }

  ngOnInit(): void {
  }

}
