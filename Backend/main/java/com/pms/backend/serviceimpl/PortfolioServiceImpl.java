package com.pms.backend.serviceimpl;

import com.pms.backend.entity.Portfolio;
import com.pms.backend.repository.InvestmentThemeRepository;
import com.pms.backend.repository.PortfolioRepository;
import com.pms.backend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
//public class PortfolioServiceImpl implements PortfolioService {
//
//    @Autowired
//    private PortfolioRepository portfolioRepository;
//
//    @Autowired
//    private InvestmentThemeRepository themeRepository;
//
//    @Override
//    public List<Portfolio> getAllPortfolios() {
//        return portfolioRepository.findAll();
//    }
//
//    @Override
//    public Optional<Portfolio> getPortfolioById(Long id) {
//        return portfolioRepository.findById(id);
//    }
//
//    @Override
//    public Portfolio createPortfolio(Portfolio portfolio) {
//        // Fix: Attach managed InvestmentTheme entity
//        if (portfolio.getTheme() != null && portfolio.getTheme().getId() != null) {
//            InvestmentTheme theme = themeRepository.findById(portfolio.getTheme().getId())
//                .orElseThrow(() -> new RuntimeException("Theme not found"));
//            portfolio.setTheme(theme);
//        } else {
//            throw new RuntimeException("Theme ID is required");
//        }
//
//        return portfolioRepository.save(portfolio);
//    }
//
//    @Override
//    public Portfolio updatePortfolio(Long id, Portfolio updated) {
//        return portfolioRepository.findById(id).map(existing -> {
//            existing.setName(updated.getName());
//            existing.setType(updated.getType());
//            existing.setCurrency(updated.getCurrency());
//            existing.setBenchmark(updated.getBenchmark());
//            existing.setExchange(updated.getExchange());
//            existing.setInitialInvestment(updated.getInitialInvestment());
//            existing.setCurrentValue(updated.getCurrentValue());
//            existing.setRebalancingFrequency(updated.getRebalancingFrequency());
//
//            // Fix: Attach managed InvestmentTheme entity
//            if (updated.getTheme() != null && updated.getTheme().getId() != null) {
//                InvestmentTheme theme = themeRepository.findById(updated.getTheme().getId())
//                    .orElseThrow(() -> new RuntimeException("Theme not found"));
//                existing.setTheme(theme);
//            }
//
//            existing.setStatus(updated.getStatus());
//            return portfolioRepository.save(existing);
//        }).orElseThrow(() -> new RuntimeException("Portfolio not found"));
//    }
//
//    @Override
//    public Portfolio updatePortfolioStatus(Long id, String status) {
//        return portfolioRepository.findById(id).map(p -> {
//            p.setStatus(status);
//            return portfolioRepository.save(p);
//        }).orElseThrow(() -> new RuntimeException("Portfolio not found"));
//    }
//
//    @Override
//    public void deletePortfolio(Long id) {
//        portfolioRepository.deleteById(id);
//    }
//}
//



@Service
public class PortfolioServiceImpl implements PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;
    
    @Autowired
    private InvestmentThemeRepository themeRepository;
    
    @Override
    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    @Override
    public Optional<Portfolio> getPortfolioById(Long id) {
        return portfolioRepository.findById(id);
    }

    @Override
    public Portfolio createPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    @Override
    public Portfolio updatePortfolio(Long id, Portfolio updated) {
        return portfolioRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setType(updated.getType());
            existing.setCurrency(updated.getCurrency());
            existing.setBenchmark(updated.getBenchmark());
            existing.setExchange(updated.getExchange());
            existing.setInitialInvestment(updated.getInitialInvestment());
            existing.setCurrentValue(updated.getCurrentValue());
            existing.setRebalancingFrequency(updated.getRebalancingFrequency());
            existing.setTheme(updated.getTheme());
            existing.setStatus(updated.getStatus());
            return portfolioRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }

    @Override
    public Portfolio updatePortfolioStatus(Long id, String status) {
        return portfolioRepository.findById(id).map(p -> {
            p.setStatus(status);
            return portfolioRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Portfolio not found"));
    }

    @Override
    public void deletePortfolio(Long id) {
        portfolioRepository.deleteById(id);
    }
}
