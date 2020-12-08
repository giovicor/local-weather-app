import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'
import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent (mock)', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(async () => {
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [MaterialModule],
      // imports: [HttpClientTestingModule],

      // If we have to include HttpClientTestingModule
      // then we're not really writing a unit test,
      // because CurrentWeatherComponent shouldn't know about HttpClient

      // providers: [{ provide: WeatherService, useClass: WeatherServiceFake }],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
    // note that injectSpy is a shorthand for
    // TestBed.inject(WeatherService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
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

  it('should not get currentWeather from weatherService on init', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges() // triggers ngOnInit

    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(0)
  })

  it(`should get correct results from getOrdinal(date)`, () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())

    // Act
    fixture.detectChanges() // triggers ngOnInit

    // Asserts

    // date: 20201120 - millisecs: 1605865983000
    expect(component.getOrdinal(1605865983000)).toEqual('th')
    // date: 20201121 - millisecs: 1605942000000
    expect(component.getOrdinal(1605942000000)).toEqual('st')
    // date: 20201122 - millisecs: 1606028400000
    expect(component.getOrdinal(1606028400000)).toEqual('nd')
    // date: 20201123 - millisecs: 1606114800000
    expect(component.getOrdinal(1606114800000)).toEqual('rd')
  })
})
