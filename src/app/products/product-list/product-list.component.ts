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
  products = [{
    id: 1,
    brand: 'ooy eqrceli',
    description: 'rlñlw brhrka',
    image: 'https://lider.cl/catalogo/images/whiteLineIcon.svg',
    price: 498724,
    priceWithDiscount: 500,
    discount: 50
  },
    {
      id: 2,
      brand: 'dsaasd',
      description: 'zlrwax bñyrh',
      image: 'https://lider.cl/catalogo/images/babyIcon.svg',
      price: 130173,
      priceWithDiscount: 0,
      discount: 0
    },
    {
      id: 3,
      brand: 'weñxoab',
      description: 'hqhoy qacirk',
      image: 'https://lider.cl/catalogo/images/homeIcon.svg',
      price: 171740,
      priceWithDiscount: 0,
      discount: 0
    },
    {
      id: 4,
      brand: 'sjlzxeo',
      description: 'pnyn rlxbewnk',
      image: 'https://lider.cl/catalogo/images/computerIcon.svg',
      price: 890348,
      priceWithDiscount: 0,
      discount: 0
    },
    {
      id: 5,
      brand: 'peuoooypt',
      description: 'trcwl iagxxh',
      image: 'https://lider.cl/catalogo/images/whiteLineIcon.svg',
      price: 814893,
      priceWithDiscount: 0,
      discount: 0
    },
    {
      id: 6,
      brand: 'ñuo onfbtya',
      description: 'vangde oswss',
      image: 'https://lider.cl/catalogo/images/homeIcon.svg',
      price: 468750,
      priceWithDiscount: 0,
      discount: 0
    },
    {
      id: 7,
      brand: 'wiñ nvnactr',
      description: 'nkhux ztdnct',
      image: 'https://lider.cl/catalogo/images/bicycleIcon.svg',
      price: 472543,
      priceWithDiscount: 500,
      discount: 50
    },
    {
      id: 8,
      brand: 'sfzkvoñ',
      description: 'hdvt tbrdeiñl',
      image: 'https://lider.cl/catalogo/images/tvIcon.svg',
      price: 428894,
      priceWithDiscount: 500,
      discount: 50
    },
    {
      id: 9,
      brand: 'nzo acrrñvh',
      description: 'ahelf lxhñep',
      image: 'https://lider.cl/catalogo/images/tvIcon.svg',
      price: 29530,
      priceWithDiscount: 500,
      discount: 50
    },
    {
      id: 10,
      brand: 'adsfsda',
      description: 'dñqy ipvukesh',
      image: 'https://lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 691504,
      priceWithDiscount: 500,
      discount: 50
    }];
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
    this.getProducts(this.searchQuery, this.pageNumber);
  }

}
