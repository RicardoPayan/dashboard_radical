import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCambioBanxicoComponent } from './tipo-cambio-banxico.component';

describe('TipoCambioBanxicoComponent', () => {
  let component: TipoCambioBanxicoComponent;
  let fixture: ComponentFixture<TipoCambioBanxicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoCambioBanxicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCambioBanxicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
