import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDataComponent } from './grid-data.component';

interface MOCKED_ELEMENT {
  name: string;
}

describe('GridDataComponent', () => {
  let component: GridDataComponent<MOCKED_ELEMENT>;
  let fixture: ComponentFixture<GridDataComponent<MOCKED_ELEMENT>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GridDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDataComponent<MOCKED_ELEMENT>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
