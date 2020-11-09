import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {Product} from '../shared/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productUrl = '/products';
  searchQuery: string;
  pageNumber: number;
  products: Product[];
  loading: boolean;

  constructor(private productService: ProductService, private router: Router,
              private route: ActivatedRoute) { }

  public getProducts(textSearch: string, page: number) {
    this.productService.getProducts(textSearch, page).subscribe(
      result => {
        this.products = result;
        this.loading = false;
      }
    );
  }

  public onSearchText(textSearch: string) {
    this.searchQuery = textSearch;
    this.refreshPage();
  }

  public onSetPageNumber(numberPage: number) {
    this.pageNumber = numberPage;
    this.refreshPage();
  }

  private refreshPage() {
    this.router.navigate([this.productUrl],
      { queryParams: { query: this.searchQuery,  page: this.pageNumber } });
  }

  private initParams() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params.name;
      this.pageNumber = params.page;
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

}
