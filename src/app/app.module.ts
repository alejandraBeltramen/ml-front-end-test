import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResultsService } from './searchResults/results.service';
import { DetailsService } from './productDetails/details.service';
import { ResultsComponent } from './searchResults/results.component';
import { DetailsComponent } from './productDetails/details.component';

const appRoutes: Routes = [
  { path: 'items', component: ResultsComponent },
  { path: 'items/:id', component: DetailsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
    AppComponent,
    DetailsComponent,
    ResultsComponent
  ],
  providers: [
    HttpClient,
    ResultsService,
    DetailsService
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
