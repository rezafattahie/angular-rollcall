import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDefinitionsComponent } from './basic-definitions.component';

describe('BasicDefinitionsComponent', () => {
  let component: BasicDefinitionsComponent;
  let fixture: ComponentFixture<BasicDefinitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDefinitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
