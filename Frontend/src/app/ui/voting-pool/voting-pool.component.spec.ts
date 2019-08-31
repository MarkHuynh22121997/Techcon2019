import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPoolComponent } from './voting-pool.component';

describe('VotingPoolComponent', () => {
  let component: VotingPoolComponent;
  let fixture: ComponentFixture<VotingPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
