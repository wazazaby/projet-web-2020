import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient) { }

  baseUrl() {
    console.log(
      environment.apiUrl,
      environment.baseUrl,
      environment.production,
      environment.tokenApi);
  }
}
