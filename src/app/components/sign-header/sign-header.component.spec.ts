import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignHeaderComponent } from './sign-header.component';

describe('SignHeaderComponent', () => {
  let component: SignHeaderComponent;
  let fixture: ComponentFixture<SignHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
