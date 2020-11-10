import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Page} from '../Page';
import {PRODUCT_PAGE_FAKE} from './product-page.fake.spec';
import {ProductProxyService} from './product-proxy.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private proxy: ProductProxyService) { }

  getProducts(textSearch: string, page: number): Observable<Page> {
    return this.proxy.getProducts(textSearch, page).pipe(
      map(response => {
        const p: Page = {
          products: response.content,
          totalPages: response.totalPages,
          size: response.size
        };
        return p;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
