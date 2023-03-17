import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAuditComponent } from './config-audit.component';

describe('DataAuditComponent', () => {
  let component: ConfigAuditComponent;
  let fixture: ComponentFixture<ConfigAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
