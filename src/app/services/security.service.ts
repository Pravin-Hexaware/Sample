import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Security } from '../Model/Security .model';
import { AssetClass } from '../Model/asset-class.model';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private baseUrl = 'http://localhost:8080/api/securities';

  private assetClassUrl = 'http://localhost:8080/api/asset-classes';


  constructor(private http: HttpClient) {}

  getAllSecurities(): Observable<Security[]> {
    return this.http.get<Security[]>(this.baseUrl);
  }

  getSecurityById(id: number): Observable<Security> {
    return this.http.get<Security>(`${this.baseUrl}/${id}`);
  }

  getSecurityByIsin(isin: string): Observable<Security> {
      return this.http.get<Security>(`${this.baseUrl}/isin/${isin}`);
    }
  
   
    getSecurityBySymbol(symbol: string): Observable<Security> {
      return this.http.get<Security>(`${this.baseUrl}/symbol/${symbol}`);
    }
  
   
    getSecuritiesBySector(sector: string): Observable<Security[]> {
      return this.http.get<Security[]>(`${this.baseUrl}/sector/${sector}`);
    }
  
   
    createSecurity(security: Security): Observable<Security> {
      return this.http.post<Security>(`${this.baseUrl}`, security);
    }
  
   
    updateSecurity(id: number, security: Security): Observable<Security> {
      return this.http.put<Security>(`${this.baseUrl}/${id}`, security);
    }
  
    
    deleteSecurity(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getAllAssetClasses(): Observable<AssetClass[]> {
      return this.http.get<AssetClass[]>(this.assetClassUrl);
    }
  
}
