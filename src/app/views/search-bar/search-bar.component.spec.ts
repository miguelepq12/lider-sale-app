import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';

describe('SearchBarComponent', () => {
  const textTest = 'arepera';

  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let routerSpy;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent, { provide: Router, useValue: routerSpy } ]
    })
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
    const inputText = searchBarDebug.query(By.css('#searchInput'));

    inputText.nativeElement.value = textTest;
    inputText.triggerEventHandler('keyup', {});
    fixture.detectChanges();

    expect(component.showSearchList).toBeTrue();
  });

  it('should save search to write text', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const inputText = searchBarDebug.query(By.css('#searchInput'));
    const selectedSearchText = searchBarDebug.query(By.css('#selectedSearchText'));

    inputText.nativeElement.value = textTest;
    inputText.triggerEventHandler('keyup', {});
    fixture.detectChanges();

    expect(inputText.nativeElement.value).toEqual(selectedSearchText.nativeElement.innerHTML);
  });

  it('should send search text when click', () => {
    const searchBarDebug: DebugElement = fixture.debugElement;
    const selectedSearch = searchBarDebug.query(By.css('#selectedSearch'));
    component.searchText = textTest;

    selectedSearch.triggerEventHandler('click', {});
    fixture.detectChanges();

    component.searchQuery.subscribe((text: string) => expect(text).toBe(textTest));
  });
});
