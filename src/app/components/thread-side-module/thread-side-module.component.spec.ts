import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSideModuleComponent } from './thread-side-module.component';

describe('ThreadSideModuleComponent', () => {
  let component: ThreadSideModuleComponent;
  let fixture: ComponentFixture<ThreadSideModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadSideModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadSideModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
