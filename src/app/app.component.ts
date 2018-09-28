import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchPlaceholder = 'Nunca dejes de buscar';
  productToSearch: string;

  constructor(private router: Router) {}

  search(): void {
    const extras: NavigationExtras = { queryParams: { search: this.productToSearch } };
    this.router.navigate(['/items'], extras);
  }
}
