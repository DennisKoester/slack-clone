import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFooterComponent } from './sign-footer.component';

describe('SignFooterComponent', () => {
  let component: SignFooterComponent;
  let fixture: ComponentFixture<SignFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
