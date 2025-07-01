import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerGenerator } from './banner-generator';

describe('BannerGenerator', () => {
  let component: BannerGenerator;
  let fixture: ComponentFixture<BannerGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
