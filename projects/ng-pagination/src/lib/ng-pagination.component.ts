import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-pagination',
  template: `
    <div class="pagination-container">
      <div class="pagination">
        <button class="nav-button" (click)="previousPage()" [disabled]="currentPage === 1">
          <span class="nav-icon">&lt;</span>
          <span class="nav-text">Previous</span>
        </button>

        @for (page of displayedPages; track $index) {
          <ng-container>
            @if (page === '...') {
              <span class="ellipsis">{{ page }}</span>
            }
            @else {
              <button 
                (click)="goToPage(page)" 
                [class.active]="page === currentPage"
                class="page-button">
                {{ page }}
              </button>
            }
          </ng-container>
        }

        <button class="nav-button" (click)="nextPage()" [disabled]="currentPage === totalPages">
          <span class="nav-text">Next</span>
          <span class="nav-icon">&gt;</span>
        </button>
      </div>

      <div class="items-per-page">
        <label for="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" (change)="onItemsPerPageChange($event)">
          @for (option of itemsPerPageOptions; track $index) {
            <option [value]="option" [selected]="option === itemsPerPage">{{ option }}</option>
          }
        </select>
      </div>
    </div>
  `,
  styles: `
    .pagination-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin: 20px 0;
    }

    .pagination {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    button {
      min-width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      background-color: #fff;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background-color: #f0f0f0;
        border-color: #999;
      }

      &.active {
        background-color: #007bff;
        color: white;
        border-color: #0056b3;
      }

      &:disabled {
        background-color: #e9ecef;
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .nav-button {
      padding: 5px 12px;
      min-width: auto;
    }

    .nav-icon {
      display: none;
    }

    .ellipsis {
      min-width: 40px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .items-per-page {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .items-per-page label {
      margin-right: 8px;
    }

    @media (max-width: 600px) {
      .pagination {
        gap: 4px;
      }

      button {
        min-width: 36px;
        height: 36px;
        font-size: 14px;
      }

      .nav-text {
        display: none;
      }

      .nav-icon {
        display: inline;
      }
    }

    @media (max-width: 400px) {
      button {
        min-width: 32px;
        height: 32px;
        font-size: 12px;
      }
    }
  `,
})
export class NgPaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Input() maxDisplayedPages: number = 7;
  @Input() itemsPerPageOptions: number[] = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  totalPages: number = 0;
  displayedPages: (number | string)[] = [];

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
  }

  generatePages() {
    if (this.totalPages <= this.maxDisplayedPages) {
      this.displayedPages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      return;
    }

    const pages: (number | string)[] = [];
    const halfDisplay = Math.floor(this.maxDisplayedPages / 2);
    
    if (this.currentPage <= halfDisplay + 1) {
      // Start of list
      for (let i = 1; i <= this.maxDisplayedPages - 2; i++) {
        pages.push(i);
      }
      pages.push('...', this.totalPages);
    } else if (this.currentPage >= this.totalPages - halfDisplay) {
      // End of list
      pages.push(1, '...');
      for (let i = this.totalPages - (this.maxDisplayedPages - 3); i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Middle of list
      pages.push(1, '...');
      for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...', this.totalPages);
    }

    this.displayedPages = pages;
  }
  
  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.generatePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.generatePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.generatePages();
      this.pageChange.emit(this.currentPage);
    }
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newItemsPerPage = parseInt(selectElement.value, 10);
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }

  trackByFn(index: number, item: number | string): number | string {
    return item;
  }
}