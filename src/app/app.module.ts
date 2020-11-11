import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchBarComponent} from './views/search-bar/search-bar.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {MainLayoutComponent} from './views/main-layout/main-layout.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {es_ES, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ProductService} from './products/shared/services/product.service';
import {ProductProxyService} from './products/shared/services/product-proxy.service';

registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MainLayoutComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    HttpClientModule
  ],
  providers: [ProductService, ProductProxyService, { provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
