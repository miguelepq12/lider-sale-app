import {async, TestBed} from '@angular/core/testing';

import { ProductProxyService } from './product-proxy.service';
import {HttpClientModule} from '@angular/common/http';

describe('ProductProxyService', () => {
  let service: ProductProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductProxyService]
    });
    service = TestBed.inject(ProductProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should get products', async((done) => {
    service.getProducts('', 1).subscribe(
      (response) => expect(response.content.length).toBeGreaterThan(0),
      (error) => fail(error)
    );
  }));
});
