import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HoldingService } from '../services/holding.service';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {
  securities: any[] = [];
  pagedSecurities: any[] = [];
  portfolioId!: number;

  pageSize = 30;
  totalItems = 0;

  constructor(
    private route: ActivatedRoute,
    private holdingService: HoldingService
  ) {}

  ngOnInit(): void {
    this.portfolioId = +this.route.snapshot.paramMap.get('id')!;
    this.loadSecurities();
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

  onPageChange(event: any): void {
    this.updatePagedSecurities(event.pageIndex);
  }

  updatePagedSecurities(pageIndex: number, source: any[] = this.securities): void {
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedSecurities = source.slice(start, end);
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
  }
}