import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {PRODUCT_PAGE_FAKE} from '../shared/fake/product-page.fake.spec';
import {ProductProxyService} from '../shared/services/product-proxy.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {registerLocaleData} from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';

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
  let productService: ProductService;
  let productProxy: ProductProxyService;
  let router: Router;
  registerLocaleData(localeCl, 'es_CL');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ProductService, ProductProxyService,
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: LOCALE_ID, useValue: 'es_CL'}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    productProxy = TestBed.inject(ProductProxyService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get products list', () => {
    spyOn(productService, 'getProducts').and.returnValue(of(PRODUCT_PAGE_FAKE));
    fixture.detectChanges();
    component.getProducts(textTest, pageNumber);
    fixture.detectChanges();
    expect(component.productsPage).toEqual(PRODUCT_PAGE_FAKE);
  });


  it('should refresh page to receive search query', () => {
    // @ts-ignore
    spyOn(router, 'navigate');
    component.onSearchQuery(textTest);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchText, page: component.pageNumber}});
  });

  it('should refresh page to receive page number', () => {
    // @ts-ignore
    spyOn(router, 'navigate');
    component.onSetPageNumber(pageNumber);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchText, page: component.pageNumber}});
  });

  it('should format number', () => {
    const numberWithoutFormat = 100000;
    const numberFormat = '100.000';
    expect(component.formatPrice(numberWithoutFormat)).toEqual(numberFormat);
  });

  it('should start parameter query without number',  async(() => {
    spyOn(productService, 'getProducts').and.returnValue(of(PRODUCT_PAGE_FAKE));
    TestBed.inject(ActivatedRoute).queryParams = of({query: undefined, page: undefined});
    fixture.detectChanges();
    expect(component.pageNumber).toEqual(1);
  }));
});
