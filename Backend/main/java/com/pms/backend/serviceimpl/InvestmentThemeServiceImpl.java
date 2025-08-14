package com.pms.backend.serviceimpl;

import com.pms.backend.entity.InvestmentTheme;
import com.pms.backend.repository.InvestmentThemeRepository;
import com.pms.backend.service.InvestmentThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentThemeServiceImpl implements InvestmentThemeService {

    @Autowired
    private InvestmentThemeRepository themeRepository;

    @Override
    public List<InvestmentTheme> getAllThemes() {
        return themeRepository.findAll();
    }

    @Override
    public InvestmentTheme getThemeById(Long id) {
        return themeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment Theme not found with id: " + id));
    }

    @Override
    public InvestmentTheme createTheme(InvestmentTheme theme) {
        return themeRepository.save(theme);
    }

    @Override
    public InvestmentTheme updateTheme(Long id, InvestmentTheme updatedTheme) {
        InvestmentTheme existing = getThemeById(id);
        existing.setName(updatedTheme.getName());
        existing.setDescription(updatedTheme.getDescription());
        existing.setRiskLevel(updatedTheme.getRiskLevel());
        existing.setInvestmentHorizon(updatedTheme.getInvestmentHorizon());
        return themeRepository.save(existing);
    }

    @Override
    public void deleteTheme(Long id) {
        themeRepository.deleteById(id);
    }

    @Override
    public List<InvestmentTheme> searchByName(String keyword) {
        return themeRepository.findByNameContainingIgnoreCase(keyword);
    }

    @Override
    public long countThemes() {
        return themeRepository.count();
    }

    @Override
    public List<InvestmentTheme> filterByInvestmentHorizon(String horizon) {
        return themeRepository.findByInvestmentHorizonIgnoreCase(horizon);
    }

    @Override
    public void deleteThemesBulk(List<Long> ids) {
        themeRepository.deleteAllById(ids);
    }
}
