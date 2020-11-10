import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductProxyService {
  private URL_API = environment.apiProductUrl + 'products/';

  constructor(private http: HttpClient) { }

  getProducts(textSearch: string, page: number): Observable<any> {
    return this.http.get(this.URL_API,
      {
        params: {text: textSearch, page: page.toString()},
      });
  }
}