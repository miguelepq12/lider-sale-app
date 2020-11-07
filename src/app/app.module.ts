import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ProductsViewComponent,
    MainLayoutComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
