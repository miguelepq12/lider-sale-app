import {async, TestBed} from '@angular/core/testing';

import { ProductService } from './product.service';
import {ProductProxyService} from './product-proxy.service';
import {of} from 'rxjs';
import {PRODUCT_PAGE_FAKE} from './product-page.fake.spec';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PRODUCT_PAGE_API_FAKE} from "./product-page-complete.fake.spec";

describe('ProdutService', () => {
  const textTest = 'arepera';
  const pageNumber = 1;

  let service: ProductService;
  let proxy: ProductProxyService;

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

});
