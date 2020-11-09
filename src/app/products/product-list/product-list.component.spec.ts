import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {Product} from '../shared/product';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {of} from 'rxjs';

describe('ProductListComponent', () => {
  const textTest = 'arepera';
  const pageNumber = 1;
  const activatedRouteMock = {
    queryParams: of({
      query: textTest,
      page: pageNumber
    }),
  };

  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let expectedProducts: Product[];
  let getProductsSpy: any;
  let productServiceSpy: any;
  let routerSpy: any;


  beforeEach(async(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{provide: ProductService, useValue: productServiceSpy}, {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    expectedProducts = [{
      id: 42, brand: 'Test', description: 'desc',
      image: 'www.l_ider.cl/catalogo/images/whiteLineIcon.svg',
      price: 1000, priceWithDiscount: 500, discount: 50
    }];
  });

  it('should get products list', () => {
    getProductsSpy = productServiceSpy.getProducts.and.returnValue(of(expectedProducts));
    fixture.detectChanges();
    component.getProducts(textTest, pageNumber);
    fixture.detectChanges();
    expect(component.products).toEqual(expectedProducts);
  });


  it('should refresh page to receive search query', () => {
    component.onSearchText(textTest);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchQuery, page: component.pageNumber}});
  });

  it('should refresh page to receive page number', () => {
    component.onSetPageNumber(pageNumber);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchQuery, page: component.pageNumber}});
  });
});
