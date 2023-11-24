import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSaveComponent } from './player-save.component';

describe('PlayerSaveComponent', () => {
  let component: PlayerSaveComponent;
  let fixture: ComponentFixture<PlayerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
