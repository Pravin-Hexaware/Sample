import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { SupportComponent } from './pages/support/support.component';
import { TermsComponent } from './pages/terms/terms.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoldingsComponent } from './holdings/holdings.component';
import { HoldingComponent } from './holding/holding.component';
import { MatPaginatorModule } from '@angular/material/paginator'; // ✅ import this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityListComponent } from './security-list/security-list.component'; 



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyComponent,
    SupportComponent,
    TermsComponent,
    FooterComponent,
    NavbarComponent,
    PortfolioComponent,
    HoldingsComponent,
    HoldingComponent,
    SecurityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
     HttpClientModule,
     FormsModule,
     BrowserAnimationsModule, // ✅ must be included
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
