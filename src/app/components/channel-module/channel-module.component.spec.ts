import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelModuleComponent } from './channel-module.component';

describe('ChannelModuleComponent', () => {
  let component: ChannelModuleComponent;
  let fixture: ComponentFixture<ChannelModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
