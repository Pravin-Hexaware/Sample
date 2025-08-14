import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {
  private securitiesUrl = 'http://localhost:8080/api/securities';
  private holdingUrl = 'http://localhost:8080/api/holdings';

  constructor(private http: HttpClient) {}

  getSecurities(): Observable<any[]> {
    return this.http.get<any[]>(this.securitiesUrl);
  }

  submitHolding(holding: any): Observable<any> {
    return this.http.post(this.holdingUrl, holding);
  }
}