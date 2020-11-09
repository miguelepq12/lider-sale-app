import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(textSearch: string, page: number): Observable<Product[]> {
    return null;
  }
}
