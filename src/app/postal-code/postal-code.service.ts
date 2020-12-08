import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { defaultIfEmpty, mergeMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

export interface IPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}

export interface IPostalCodeData {
  postalCodes: [IPostalCode]
}

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private httpClient: HttpClient) {}
  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const url = `${environment.baseUrl}${environment.geonamesApi.api}.geonames.org/postalCodeSearchJSON`

    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.geonamesApi.username)
      .set('postalcode', postalCode)
      .set('country', 'IT')

    return this.httpClient
      .get<IPostalCodeData>(url, { params: uriParams })
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      )

    // With 'defaultIfEmpty', we ensure that a null value will be provided
    // if we don't receive a result from the API.
  }
}
