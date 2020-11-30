import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'

import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(private weatherService: WeatherService) {}

  // Imperative-style
  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
      if (!this.search.invalid) {
        const userInput = searchValue.split(',').map((s) => s.trim())
        this.weatherService
          .getCurrentWeather(
            userInput[0],
            userInput.length > 1 ? userInput[1] : undefined
          )
          .subscribe((data) => console.log(data))
      }
    })
  }

  getErrorMessage(): string {
    // if (this.search.hasError('minLength'))
    // if (this.search.invalid)

    if (this.search.invalid) {
      return 'Inserire almeno 3 caratteri'
    } else {
      return 'Errore di inserimento'
    }
  }
}
