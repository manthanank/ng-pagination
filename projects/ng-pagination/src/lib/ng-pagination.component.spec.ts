import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPaginationComponent } from './ng-pagination.component';

describe('NgPaginationComponent', () => {
  let component: NgPaginationComponent;
  let fixture: ComponentFixture<NgPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
