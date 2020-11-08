import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherService: WeatherService) {
    /*
    this.current = {
      city: 'Monza',
      country: 'Italia',
      date: new Date(),
      image: 'assets/img/sunny.svg',
      temperature: 72,
      description: 'soleggiato',
    } as ICurrentWeather
    */
  }

  ngOnInit(): void {
    this.weatherService
      .getCurrentWeather('Monza', 'IT')
      .subscribe((data) => (this.current = data))
  }
}
