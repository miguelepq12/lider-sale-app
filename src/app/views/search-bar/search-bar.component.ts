import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  showSearchList: boolean;
  isOverlay: boolean;
  @Input() searchText: string;
  @Output() searchQuery = new EventEmitter<string>();

  constructor() {
  }

  public onShowListSearch(textSearch: string): void {
    this.showSearchList = textSearch ? textSearch.length > 0 :
      this.searchText.length > 0;
  }

  public onSearchQuery(): void {
    this.searchQuery.emit(this.searchText);
  }

  public onSwitchOverlay(): void {
    this.isOverlay = !this.isOverlay;
  }
  ngOnInit(): void {
  }
}
