import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereAddComponent } from './filiere-add.component';

describe('FiliereAddComponent', () => {
  let component: FiliereAddComponent;
  let fixture: ComponentFixture<FiliereAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliereAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliereAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
