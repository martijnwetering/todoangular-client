import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export let configFactory = (configService: ConfigService) => {
  return () => configService.load();
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl = '/api/todo';
  public apiAvailable = false;

  constructor(private _httpClient: HttpClient) { }

  load(): Promise<boolean> {
    return this._httpClient.get(this.baseUrl)
      .toPromise()
      .then(
        _ => {
          this.apiAvailable = true;
          return true;
        },
        _ => false
      )
  }
}
