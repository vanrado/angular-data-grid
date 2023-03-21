import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPaginationComponent } from './grid-pagination.component';

describe('GridPaginationComponent', () => {
  let component: GridPaginationComponent;
  let fixture: ComponentFixture<GridPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GridPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
