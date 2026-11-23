import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should calculate initials from the first two words', () => {
    const app = TestBed.createComponent(App).componentInstance;
    expect(app.iniciales('Lucía Martín')).toBe('LM');
    expect(app.iniciales('ana maría torres')).toBe('AM');
  });
});
