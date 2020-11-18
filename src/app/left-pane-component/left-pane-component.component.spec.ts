import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPaneComponentComponent } from './left-pane-component.component';

describe('LeftPaneComponentComponent', () => {
  let component: LeftPaneComponentComponent;
  let fixture: ComponentFixture<LeftPaneComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftPaneComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPaneComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
