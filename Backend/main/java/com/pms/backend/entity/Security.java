package com.pms.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "securities")
public class Security {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exchange")
    private String exchange;

    @Column(name = "symbol", nullable = false)
    private String symbol;

    @Column(name = "name")
    private String name;

    @Column(name = "isin")
    private String isin;

    @Column(name = "sector")
    private String sector;

    @Column(name = "industry")
    private String industry;

    @Column(name = "currency")
    private String currency;

    @Column(name = "country")
    private String country;

    @Column(name = "security_code")
    private String securityCode;

    @Column(name = "series")
    private String series;
    
    @Column(name= "price")
    private float price;

    @ManyToOne
    @JoinColumn(name = "asset_class_id")
    private AssetClass assetClass;

	public Security(Long id, String exchange, String symbol, String name, String isin, String sector, String industry,
			String currency, String country, String securityCode, String series,float price, AssetClass assetClass) {
		super();
		this.id = id;
		this.exchange = exchange;
		this.symbol = symbol;
		this.name = name;
		this.isin = isin;
		this.sector = sector;
		this.industry = industry;
		this.currency = currency;
		this.country = country;
		this.securityCode = securityCode;
		this.series = series;
		this.price=price;
		this.assetClass = assetClass;
	}

	public Security() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsin() {
		return isin;
	}

	public void setIsin(String isin) {
		this.isin = isin;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getSecurityCode() {
		return securityCode;
	}

	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}
	

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public AssetClass getAssetClass() {
		return assetClass;
	}

	public void setAssetClass(AssetClass assetClass) {
		this.assetClass = assetClass;
	}

    
}
