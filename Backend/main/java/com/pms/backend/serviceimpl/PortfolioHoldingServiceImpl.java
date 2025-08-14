package com.pms.backend.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.backend.entity.PortfolioHolding;
import com.pms.backend.repository.PortfolioHoldingRepository;
import com.pms.backend.service.PortfolioHoldingService;

@Service
public class PortfolioHoldingServiceImpl implements PortfolioHoldingService {

    @Autowired
    private PortfolioHoldingRepository holdingRepository;

    @Override
    public List<PortfolioHolding> getAllHoldings() {
        return holdingRepository.findAll();
    }

    @Override
    public List<PortfolioHolding> getHoldingsByPortfolioId(Long portfolioId) {
        return holdingRepository.findByPortfolioId(portfolioId);
    }

    @Override
    public PortfolioHolding getHoldingById(Long id) {
        return holdingRepository.findById(id).orElse(null);
    }

    @Override
    public PortfolioHolding createHolding(PortfolioHolding holding) {
        // Optional: calculate value = quantity * price
        holding.setValue(holding.getPrice().multiply(
                java.math.BigDecimal.valueOf(holding.getQuantity())));
        return holdingRepository.save(holding);
    }

    @Override
    public PortfolioHolding updateHolding(Long id, PortfolioHolding holding) {
        PortfolioHolding existing = holdingRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setQuantity(holding.getQuantity());
        existing.setPrice(holding.getPrice());
        existing.setValue(holding.getPrice().multiply(
                java.math.BigDecimal.valueOf(holding.getQuantity())));
        existing.setEquityCategory(holding.getEquityCategory());
        existing.setSecurity(holding.getSecurity());
        existing.setPortfolio(holding.getPortfolio());

        return holdingRepository.save(existing);
    }

    @Override
    public boolean deleteHolding(Long id) {
        if (!holdingRepository.existsById(id)) return false;
        holdingRepository.deleteById(id);
        return true;
    }

    @Override
    public Double calculateTotalValue(Long portfolioId) {
        List<PortfolioHolding> holdings = holdingRepository.findByPortfolioId(portfolioId);
        return holdings.stream()
                .map(h -> h.getValue().doubleValue())
                .reduce(0.0, Double::sum);
    }
}