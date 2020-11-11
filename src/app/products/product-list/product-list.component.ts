import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../shared/page';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productUrl = '/products';
  searchText: string;
  pageNumber: number;
  loading: boolean;
  productsPage: Page;

  constructor(private productService: ProductService, private router: Router,
              private route: ActivatedRoute) {
  }

  public getProducts(textSearch: string, page: number) {
    this.productService.getProducts(textSearch, page).subscribe(
      result => {
        this.productsPage = result;
        this.loading = false;
      }
    );
  }

  public onSearchQuery(textSearch: string) {
    this.searchText = textSearch;
    this.refreshPage();
  }

  public onSetPageNumber(numberPage: number) {
    this.pageNumber = numberPage;
    this.refreshPage();
  }

  private refreshPage() {
    this.router.navigate(['/products'],
      { queryParams: { query: this.searchText,  page: this.pageNumber }});
  }

  public formatPrice(price: number): string {
    return formatNumber(price, 'es_CL');
  }
  private initParams() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params.query;
      this.pageNumber = params.page ? params.page : 1;
      this.getProducts(this.searchText, this.pageNumber);
    });
  }

  ngOnInit(): void {
    this.initParams();
  }

}
