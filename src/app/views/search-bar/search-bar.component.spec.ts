import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  const textTest = 'arepera';

  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show selected search to write text', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const inputText = searchBarDebug.query(By.css('.search-box'));
    component.searchText = textTest;

    inputText.triggerEventHandler('keyup', component.onShowListSearch(''));
    fixture.detectChanges();
    expect(component.showSearchList).toBeTrue();
  });

  it('should save search to write text', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const selectedSearchText = searchBarDebug.query(By.css('.text-search > b'));

    component.searchText = textTest;
    fixture.detectChanges();
    expect(component.searchText).toEqual(selectedSearchText.nativeElement.innerHTML);
  });

  it('should send search text when click', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const selectedSearch = searchBarDebug.query(By.css('.search-word > a'));
    component.searchText = textTest;

    selectedSearch.triggerEventHandler('click', component.onSearchQuery());
    fixture.detectChanges();
    component.searchQuery.subscribe((text: string) => expect(text).toBe(textTest));
  });

  it('should hidden overlay screen', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const searchOverlay = searchBarDebug.query(By.css('.search-overlay'));
    component.searchText = textTest;

    searchOverlay.triggerEventHandler('click', component.onSwitchOverlay());
    fixture.detectChanges();
    expect(component.isOverlay).toBeFalse();
  });
});
