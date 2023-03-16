import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxComponentComponent } from './sandbox-component.component';

describe('SandboxComponentComponent', () => {
  let component: SandboxComponentComponent;
  let fixture: ComponentFixture<SandboxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandboxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
