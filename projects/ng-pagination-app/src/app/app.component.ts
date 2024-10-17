import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgPaginationComponent } from '../../../ng-pagination/src/lib/ng-pagination.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgPaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Pagination Example';

  totalItems = 100;
  itemsPerPage = 10;
  currentPage = 1;

  onPageChange(page: number) {
    this.currentPage = page;
  }
}