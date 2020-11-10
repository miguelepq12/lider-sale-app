import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {PRODUCT_PAGE_FAKE} from '../shared/services/product-page.fake.spec';
import {ProductProxyService} from '../shared/services/product-proxy.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ProductService, ProductProxyService,
        {provide: ActivatedRoute, useValue: activatedRouteMock}],
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
    spyOn(router, 'navigate');
    component.onSearchText(textTest);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchQuery, page: component.pageNumber}});
  });

  it('should refresh page to receive page number', () => {
    spyOn(router, 'navigate');
    component.onSetPageNumber(pageNumber);
    fixture.detectChanges();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith([component.productUrl],
      {queryParams: {query: component.searchQuery, page: component.pageNumber}});
  });
});
