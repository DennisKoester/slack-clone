import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChatUsersComponent } from './select-chat-users.component';

describe('SelectChatUsersComponent', () => {
  let component: SelectChatUsersComponent;
  let fixture: ComponentFixture<SelectChatUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectChatUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectChatUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
