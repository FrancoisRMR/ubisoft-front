import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleGamesComponent } from './multiple-games.component';

describe('MultipleGamesComponent', () => {
  let component: MultipleGamesComponent;
  let fixture: ComponentFixture<MultipleGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleGamesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
