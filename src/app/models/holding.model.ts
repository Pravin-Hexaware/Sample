// export interface Holding {
//   id: number | null;
//   securityCode: string;
//   securityName?: string;
//   quantity: number;
//   purchasePrice: number;
//   purchaseDate: string; // ISO string like '2025-08-13'
//   portfolioId: number;  // Foreign key reference to portfolio
// }

export interface PortfolioHolding {
  id?: number;
  quantity: number;
  price: number;
  value: number;
  equityCategory: string;
  portfolio: any;
  security: {
    id: number;
    name?: string;
  };
}
