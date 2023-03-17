import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAuditComponent } from './data-audit.component';

describe('DataAuditComponent', () => {
  let component: DataAuditComponent;
  let fixture: ComponentFixture<DataAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
