import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { Security } from '../Model/Security .model';
import { AssetClass } from '../Model/asset-class.model';

@Component({
  selector: 'app-security-master',
  templateUrl: './security-master.component.html',
  styleUrls: ['./security-master.component.css']
})
export class SecurityMasterComponent implements OnInit {
  securities: Security[] = [];
  filteredSecurities: Security[] = [];
  assetClasses: AssetClass[] = [];

  showAddForm = false;

  newSecurity: Security = {
    exchange: '',
    symbol: '',
    name: '',
    isin: '',
    sector: '',
    industry: '',
    currency: '',
    country: '',
    securityCode: '',
    series: '',
    price: 0,
    assetClass: {
      id: 0,
      className: '',
      description: '',
      subClassName: '',
      subClassDescription: '',
      risk: '',
      investmentHorizon: ''
    
    }
  };

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.loadSecurities();
    // this.loadAssetClasses(); // Uncomment if needed
  }

  loadSecurities(): void {
    this.securityService.getAllSecurities().subscribe(data => {
      this.securities = data;
      this.filteredSecurities = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredSecurities = this.securities.filter(s =>
      s.name.toLowerCase().includes(filterValue) ||
      s.symbol.toLowerCase().includes(filterValue) ||
      s.isin.toLowerCase().includes(filterValue)
    );
  }

  toggleAddForm(): void {
    this.showAddForm = true;
  }

  cancelAdd(): void {
    this.resetForm();
    this.showAddForm = false;
  }

  createSecurity(): void {
    this.securityService.createSecurity(this.newSecurity).subscribe(() => {
      this.loadSecurities();
      this.cancelAdd();
    });
  }

  deleteSecurity(id: number): void {
    this.securityService.deleteSecurity(id).subscribe(() => {
      this.securities = this.securities.filter(s => s.id !== id);
      this.filteredSecurities = this.filteredSecurities.filter(s => s.id !== id);
    });
  }

  editSecurity(security: Security): void {
    alert(`Edit feature not implemented yet for ${security.name}`);
  }

  private resetForm(): void {
    this.newSecurity = {
      exchange: '',
      symbol: '',
      name: '',
      isin: '',
      sector: '',
      industry: '',
      currency: '',
      country: '',
      securityCode: '',
      series: '',
      price: 0,
      assetClass: {
        id: 0,
        className: '',
        description: '',
        subClassName: '',
        subClassDescription: '',
        risk: '',
        investmentHorizon: ''
      
      }
    };
  }

  loadAssetClasses(): void {
    this.securityService.getAllAssetClasses().subscribe(data => {
      this.assetClasses = data;
    });
  }
}