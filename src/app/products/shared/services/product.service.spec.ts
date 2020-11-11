import {async, TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {ProductProxyService} from './product-proxy.service';
import {defer, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PRODUCT_PAGE_API_FAKE} from "../fake/product-page-complete.fake.spec";
import {HttpErrorResponse} from "@angular/common/http";

describe('ProdutService', () => {
  const textTest = 'arepera';
  const pageNumber = 1;

  let service: ProductService;
  let proxy: ProductProxyService;

  function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]});
  });

  beforeEach(() => {
    service = TestBed.inject(ProductService);
    proxy = TestBed.inject(ProductProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', async(() => {
    spyOn(proxy, 'getProducts').and.returnValue(of(PRODUCT_PAGE_API_FAKE));
    service.getProducts(textTest, pageNumber).subscribe(
      (page) => {
        expect(page.products.length).toBeGreaterThan(0);
      }
    );
  }));

  it('should get a error to get products', async(() => {
    const errorResponse = new HttpErrorResponse({
      error: '409 error',
      status: 409,
      statusText: 'Conflict'
    });
    spyOn(proxy, 'getProducts').and.returnValue(asyncError(errorResponse));

    service.getProducts('fd', 1).subscribe(
      data => fail('Should have failed with 409 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(409);
        expect(error.error).toContain('409 error');
      });

  }));
});
