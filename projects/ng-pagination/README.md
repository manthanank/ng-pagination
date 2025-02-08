# Ng Pagination

This is a simple pagination library for Angular applications.

![npm](https://img.shields.io/npm/dw/@manthanankolekar/ng-pagination)
![npm](https://img.shields.io/npm/dm/@manthanankolekar/ng-pagination)
![npm](https://img.shields.io/npm/dy/@manthanankolekar/ng-pagination)
![npm](https://img.shields.io/npm/dt/@manthanankolekar/ng-pagination)

## Installation

To install this library, run:

```bash
npm install @manthanankolekar/ng-pagination
```

## Usage

Import in your `app.component.ts`:

```typescript
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

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.updateDisplayedItems();
  }

  private updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.items.slice(startIndex, endIndex);
  }
}
```

Add the following to your `app.component.html`:

```html
  <ng-pagination 
    [totalItems]="totalItems" 
    [itemsPerPage]="itemsPerPage" 
    [currentPage]="currentPage" 
    [itemsPerPageOptions]="[5, 10, 20, 50]"
    (pageChange)="onPageChange($event)"
    (itemsPerPageChange)="onItemsPerPageChange($event)">
  </ng-pagination>
```

## Demo

[StackBlitz](https://stackblitz.com/edit/ng-pagination)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
