import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasProximasComponent } from './citas-proximas.component';

describe('CitasProximasComponent', () => {
  let component: CitasProximasComponent;
  let fixture: ComponentFixture<CitasProximasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasProximasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasProximasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
