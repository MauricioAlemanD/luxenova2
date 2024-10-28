import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOpinionComponent } from './user-opinion.component';

describe('UserOpinionComponent', () => {
  let component: UserOpinionComponent;
  let fixture: ComponentFixture<UserOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOpinionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
