package com.pms.backend.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.backend.entity.Security;
import com.pms.backend.repository.SecurityRepository;
import com.pms.backend.service.SecurityService;

@Service
public class SecurityServiceImpl implements SecurityService {

    @Autowired
    private SecurityRepository securityRepository;

    @Override
    public List<Security> getAllSecurities() {
        return securityRepository.findAll();
    }

    @Override
    public Security getSecurityById(Long id) {
        return securityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Security not found with ID: " + id));
    }

    @Override
    public Security getSecurityByIsin(String isin) {
        return securityRepository.findByIsin(isin)
                .orElseThrow(() -> new RuntimeException("Security not found with ISIN: " + isin));
    }

    @Override
    public Security getSecurityBySymbol(String symbol) {
        return securityRepository.findBySymbol(symbol)
                .orElseThrow(() -> new RuntimeException("Security not found with symbol: " + symbol));
    }

    @Override
    public List<Security> getSecuritiesBySector(String sector) {
        return securityRepository.findBySector(sector);
    }

    @Override
    public Security createSecurity(Security security) {
        return securityRepository.save(security);
    }

    @Override
    public Security updateSecurity(Long id, Security updatedSecurity) {
        Security existing = getSecurityById(id);
        existing.setExchange(updatedSecurity.getExchange());
        existing.setSymbol(updatedSecurity.getSymbol());
        existing.setName(updatedSecurity.getName());
        existing.setIsin(updatedSecurity.getIsin());
        existing.setSector(updatedSecurity.getSector());
        existing.setIndustry(updatedSecurity.getIndustry());
        existing.setCurrency(updatedSecurity.getCurrency());
        existing.setCountry(updatedSecurity.getCountry());
        existing.setSecurityCode(updatedSecurity.getSecurityCode());
        existing.setSeries(updatedSecurity.getSeries());
        existing.setAssetClass(updatedSecurity.getAssetClass());
        return securityRepository.save(existing);
    }

    @Override
    public void deleteSecurity(Long id) {
        securityRepository.deleteById(id);
    }
}
