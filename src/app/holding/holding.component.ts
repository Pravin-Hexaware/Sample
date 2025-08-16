import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HoldingService } from '../holding.service';
import { PortfolioHolding } from '../models/portfolio-holding.model';
import { Portfolio } from '../models/portfolio.model';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html'
})
export class HoldingComponent implements OnInit {
  portfolioId!: number;
  portfolio!: Portfolio;
  holdings: PortfolioHolding[] = [];
  

  // Inline editing
  editingHoldingId: number | null = null;
  holdingEdits: Partial<PortfolioHolding> = {};

  // Securities for adding new holdings
  securities: any[] = [];
  pagedSecurities: any[] = [];
  pageSize = 30;
  totalItems = 0;

  constructor(
    private route: ActivatedRoute,
    private holdingService: HoldingService
  ) {}

  ngOnInit(): void {
    this.portfolioId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPortfolioDetails();
    this.loadHoldings();
    this.loadSecurities();
  }

  loadPortfolioDetails(): void {
    this.holdingService.getPortfolio(this.portfolioId).subscribe(data => {
      this.portfolio = data;
    });
  }

  loadHoldings(): void {
    this.holdingService.getHoldingsByPortfolioId(this.portfolioId).subscribe(data => {
      this.holdings = data;
    });
  }

  loadSecurities(): void {
    this.holdingService.getSecurities().subscribe(data => {
      this.securities = data.map(sec => ({
        ...sec,
        selected: false,
        quantity: null
      }));
      this.totalItems = this.securities.length;
      this.updatePagedSecurities(0);
    });
  }

  updatePagedSecurities(pageIndex: number, source: any[] = this.securities): void {
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSecurities = source.slice(start, end);
  }

  applyFilter(event: any): void {
    const query = event.target.value.toLowerCase();
    const filtered = this.securities.filter(sec =>
      sec.name.toLowerCase().includes(query) ||
      sec.symbol.toLowerCase().includes(query) ||
      sec.isin.toLowerCase().includes(query)
    );
    this.totalItems = filtered.length;
    this.updatePagedSecurities(0, filtered);
  }

  toggleSelection(security: any): void {
    security.selected = !security.selected;
    if (!security.selected) {
      security.quantity = null;
    }
  }

  cancelEdit(): void {
    this.editingHoldingId = null;
    this.holdingEdits = {};
  }

  deleteHolding(id: number): void {
    this.holdingService.deleteHolding(id).subscribe({
      next: () => {
        this.holdings = this.holdings.filter(h => h.id !== id);
        console.log(`Holding ${id} deleted successfully`);
        this.loadHoldings();
      },
      error: err => {
        console.error(`Failed to delete holding ${id}`, err);
        alert('Failed to delete holding. Please try again.');
      }
    });
  }

  addToPortfolio(stock: any): void {
    stock.selected = true;
    stock.quantity = 1;
  }

  removeFromPortfolio(stock: any): void {
    stock.selected = false;
    stock.quantity = null;
  }

  increaseQuantity(stock: any): void {
    stock.quantity++;
    stock.selected = true;
  }
  
  decreaseQuantity(stock: any): void {
    if (stock.quantity > 1) {
      stock.quantity--;
    } else {
      this.removeFromPortfolio(stock);
    }
  }


  submitHolding(): void {
    const selectedHolding = this.securities
      .filter(sec => sec.selected && sec.quantity > 0)
      .map(sec => ({
        quantity: sec.quantity,
        price: sec.price,
        equityCategory: sec.assetClass.subClassName,
        security: { id: sec.id },
        portfolio: { id: this.portfolioId }
      }));

    if (selectedHolding.length === 0) {
      alert('Please add at least one security with quantity.');
      return;
    }

    selectedHolding.forEach(holding => {
      this.holdingService.submitHolding(holding).subscribe({
        next: () => console.log('Submitted:', holding),
        error: err => console.error('Error:', err)
      });
    });

    alert('Holdings submitted successfully!');
    this.loadHoldings();
  }

  
}
