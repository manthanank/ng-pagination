import { NgModule } from '@angular/core';
import { NgPaginationComponent } from './ng-pagination.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    NgPaginationComponent,
    PaginationComponent
  ],
  imports: [
  ],
  exports: [
    NgPaginationComponent
  ]
})
export class NgPaginationModule { }
