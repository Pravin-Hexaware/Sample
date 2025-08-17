import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Theme {
  id: number;
  name: string;
}

export interface Portfolio {
  id: number;
  name: string;
  type: string;
  currency: string;
  benchmark: string;
  exchange: string;
  initialInvestment: number;
  currentValue: number;
  rebalancingFrequency: string;
  status: string;
  theme: { id: number; name?: string };
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:8080/api/portfolios';
  private themeUrl = 'http://localhost:8080/api/investment-themes';

  constructor(private http: HttpClient) {}

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.baseUrl);
  }

  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createPortfolio(portfolio: any): Observable<any> {
    console.log('Payload being sent:', portfolio);
    return this.http.post<any>(this.baseUrl, portfolio);
  }

  updatePortfolio(id: number, portfolio: any): Observable<any> {
    console.log('Updating portfolio with:', portfolio);
    return this.http.put<any>(`${this.baseUrl}/${id}`, portfolio);
  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeUrl);
  }
}
