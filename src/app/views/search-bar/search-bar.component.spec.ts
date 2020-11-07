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
    const selectedSearch = searchBarDebug.query(By.css('#selectedSearch'));

    inputText.nativeElement.value = textTest;
    inputText.triggerEventHandler('keyup', {});
    fixture.detectChanges();

    expect(component.showSearchList).toBeTrue();
    expect(inputText.nativeElement.value).toEqual(selectedSearch.nativeElement.innerHTML);
  });

  it('should refresh product page with query', () => {
    component.routerUrl= '/products';
    component.searchQuery = textTest;
    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith([component.routerUrl], {queryParams: {query: component.searchQuery}});
  });
});
