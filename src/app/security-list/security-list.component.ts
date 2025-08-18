import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Security } from '../models/Security.model';
import { AssetClass } from '../models/asset-class.model';

@Component({
  selector: 'app-security-list',
  templateUrl: './security-list.component.html',
  styleUrls: ['./security-list.component.css']
})
export class SecurityListComponent implements OnInit {
  // Columns for display (used in HTML if needed)
  displayedColumns: string[] = [
    'exchange', 'symbol', 'name', 'isin', 'sector', 'industry',
    'currency', 'country', 'securityCode', 'series', 'price', 'assetClassId', 'actions'
  ];

  // Full list of securities from backend
  securities: Security[] = [];

  // Filtered list for display
  dataSource: Security[] = [];

  // Optional: list of asset classes
  assetClasses: AssetClass[] = [];

  // Form model for new security
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
    price: null,
    assetClass: {
      id: null
    }
  };

  // Toggle for add form
  showAddForm = false;

  constructor(private securityService: SecurityService) {}

  ngOnInit(): void {
    this.loadSecurities();
    // Optional: load asset classes if needed
    // this.loadAssetClasses();
  }

  // Load all securities from backend
  loadSecurities(): void {
    this.securityService.getAllSecurities().subscribe(data => {
      this.securities = data;
      this.dataSource = data;
    });
  }

  // Optional: load asset classes
  loadAssetClasses(): void {
    this.securityService.getAllAssetClasses().subscribe(data => {
      this.assetClasses = data;
    });
  }

  // Filter securities by name, symbol, or ISIN
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = this.securities.filter(security =>
      security.name.toLowerCase().includes(filterValue) ||
      security.symbol.toLowerCase().includes(filterValue) ||
      security.isin.toLowerCase().includes(filterValue)
    );
  }

  // Show the add form
  toggleAddForm(): void {
    this.showAddForm = true;
  }

  // Reset form and hide it
  cancelAdd(): void {
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
      price: null,
      assetClass: {
        id: null
      }
    };
    this.showAddForm = false;
  }

  // Create a new security
  createSecurity(): void {
    this.securityService.createSecurity(this.newSecurity).subscribe(() => {
      this.cancelAdd();
      this.loadSecurities();
    });
  }

  // Delete a security by ID
  deleteSecurity(id: number): void {
    this.securityService.deleteSecurity(id).subscribe(() => {
      this.loadSecurities();
    });
  }

  // Placeholder for edit functionality
  editSecurity(security: Security): void {
    alert(`Edit feature not implemented yet for ${security.name}`);
  }
}