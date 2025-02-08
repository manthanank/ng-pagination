import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPaginationComponent } from '../../../ng-pagination/src/lib/ng-pagination.component';

interface Item {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgPaginationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Pagination Example';
  items: Item[] = [];
  displayedItems: Item[] = [];
  
  totalItems = 100;
  itemsPerPage = 10;
  currentPage = 1;

  ngOnInit() {
    // Generate dummy data
    this.items = Array.from({ length: this.totalItems }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`
    }));
    
    this.updateDisplayedItems();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedItems();
  }

  private updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.items.slice(startIndex, endIndex);
  }
}