import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { WeatherService } from '../weather/weather.service'
import { CitySearchTpldrivenComponent } from './city-search-tpldriven.component'

describe('CitySearchTpldrivenComponent', () => {
  let component: CitySearchTpldrivenComponent
  let fixture: ComponentFixture<CitySearchTpldrivenComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])

    await TestBed.configureTestingModule({
      declarations: [CitySearchTpldrivenComponent],
      imports: [FormsModule],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchTpldrivenComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges() // triggers ngOnInit

    // Assert
    expect(component).toBeTruthy()
  })
})
