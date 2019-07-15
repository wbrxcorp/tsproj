import 'reflect-metadata';
import 'zone.js/dist/zone';

import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule, Component, Injectable, Inject, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja'

declare const PRODUCTION: boolean;

@Component({
  selector: 'app-root',
  template: 'APP2APP2APP2'
})
class AppComponent {
}

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  providers: [ { provide: LOCALE_ID, useValue: 'ja-JP' } ],
  bootstrap: [ AppComponent ]
})
class AppModule {
  constructor() { }
}

if (PRODUCTION) enableProdMode();

registerLocaleData(localeJa, "ja");

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));
