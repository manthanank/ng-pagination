import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-pagination',
  standalone: true,
  imports: [],
  template: `
    <div class="pagination">
      <button (click)="previousPage()" [disabled]="currentPage === 1">
        Previous
      </button>

      @for (page of pages; track $index) {
      <ng-container>
        <button (click)="goToPage(page)" [class.active]="page === currentPage">
          {{ page }}
        </button>
      </ng-container>
      }

      <button (click)="nextPage()" [disabled]="currentPage === totalPages">
        Next
      </button>
    </div>
  `,
  styles: `
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      button {
        padding: 5px 10px;
        margin: 0 5px;
        border: 1px solid #ddd;
        background-color: #fff;
        cursor: pointer;

        &.active {
          background-color: #007bff;
          color: white;
        }

        &:disabled {
          background-color: #e9ecef;
          cursor: not-allowed;
        }
      }
    }
  `,
})
export class NgPaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.generatePages();
  }

  generatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }
}
