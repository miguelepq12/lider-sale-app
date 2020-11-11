import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change number to press pagination', () => {
    const navigationDebug: DebugElement = fixture.debugElement;
    const navigation = navigationDebug.query(By.css('.pagination-box > nz-pagination'));

    navigation.triggerEventHandler('nzPageIndexChange', component.changeNumberPage(1));
    fixture.detectChanges();
    component.changePage.subscribe((page: number) => expect(page).toBe(1));
  });
});
