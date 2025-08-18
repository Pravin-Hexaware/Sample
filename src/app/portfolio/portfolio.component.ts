import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  portfolios: any[] = [];
  showForm = false;
  editMode = false;
  selectedPortfolio: any = this.getEmptyPortfolio();

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadPortfolios();
  }

  getEmptyPortfolio() {
    return {
      id: null,
      name: '',
      type: '',
      currency: '',
      benchmark: '',
      exchange: '',
      initialInvestment: 0,
      currentValue: 0,
      rebalancingFrequency: '',
      theme: { 
        id: null, 
        name: '', 
        description: '', 
        riskLevel: '', 
        investmentHorizon: '' 
      },
      status: ''
    };
  }

  loadPortfolios() {
    this.http.get<any[]>('http://localhost:8080/api/portfolios')
      .subscribe(data => this.portfolios = data);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.editMode = false;
      this.selectedPortfolio = this.getEmptyPortfolio();
    }
  }

  savePortfolio() {
    if (this.editMode) {
      this.http.put(`http://localhost:8080/api/portfolios/${this.selectedPortfolio.id}`, this.selectedPortfolio)
        .subscribe(() => {
          this.loadPortfolios();
          this.cancelEdit();
        });
    } else {
      this.http.post('http://localhost:8080/api/portfolios', this.selectedPortfolio)
        .subscribe(() => {
          this.loadPortfolios();
          this.toggleForm();
        });
    }
  }

  editPortfolio(portfolio: any) {
    this.selectedPortfolio = { 
      ...portfolio, 
      theme: portfolio.theme || { 
        id: null, 
        name: '', 
        description: '', 
        riskLevel: '', 
        investmentHorizon: '' 
      }
    };
    this.editMode = true;
    this.showForm = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.showForm = false;
    this.selectedPortfolio = this.getEmptyPortfolio();
  }

  deletePortfolio(id: number) {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      this.http.delete(`http://localhost:8080/api/portfolios/${id}`)
        .subscribe(() => this.loadPortfolios());
    }
  }

 viewHoldings(portfolioId: number) {
  this.router.navigate(['/holding', portfolioId]);
}
}
