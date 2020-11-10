import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {Product} from '../shared/product';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../shared/services/product.service';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from "rxjs";

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
  let productService: ProductService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule, ],
      providers: [ProductService,
        {provide: ActivatedRoute, useValue: activatedRouteMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
  });

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
    spyOn(productService, 'getProducts').and.returnValue(of(expectedProducts));
    fixture.detectChanges();
    component.getProducts(textTest, pageNumber);
    fixture.detectChanges();
    expect(component.products).toEqual(expectedProducts);
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
