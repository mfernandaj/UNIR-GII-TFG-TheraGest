import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesCitasComponent } from './notificaciones-citas.component';

describe('NotificacionesCitasComponent', () => {
  let component: NotificacionesCitasComponent;
  let fixture: ComponentFixture<NotificacionesCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificacionesCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
