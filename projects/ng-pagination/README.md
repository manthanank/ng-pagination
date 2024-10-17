# Ng Pagination Library

This is a simple pagination library for Angular 2+ applications. It is a simple component that can be used to paginate any list of items.

## Installation

To install this library, run:

```bash
npm install @manthanankolekar/ng-pagination
```

## Usage

Import in your `app.component.ts`:

```typescript
import { Component } from '@angular/core';

import { NgPaginationComponent } from '@manthanankolekar/ng-pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgPaginationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-pagination';
  currentPage = 1;

  onPageChange(page: number) {
    this.currentPage = page;
  }

  constructor() {}

  ngOnInit() {}
}
```

Add the following to your `app.component.html`:

```html
<ng-pagination [totalItems]="100" [itemsPerPage]="10" [currentPage]="currentPage" (pageChange)="onPageChange($event)"></ng-pagination>
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
