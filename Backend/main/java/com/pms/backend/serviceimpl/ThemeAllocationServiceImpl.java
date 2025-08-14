package com.pms.backend.serviceimpl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.backend.entity.ThemeAllocation;
import com.pms.backend.repository.ThemeAllocationRepository;
import com.pms.backend.service.ThemeAllocationService;

@Service
public class ThemeAllocationServiceImpl implements ThemeAllocationService {

    @Autowired
    private ThemeAllocationRepository themeAllocationRepository;

    @Override
    public List<ThemeAllocation> getAllAllocations() {
        return themeAllocationRepository.findAll();
    }

    @Override
    public List<ThemeAllocation> getAllocationsByThemeId(Long themeId) {
        return themeAllocationRepository.findByThemeId(themeId);
    }

    @Override
    public ThemeAllocation getAllocationById(Long id) {
        return themeAllocationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allocation not found with ID: " + id));
    }

    @Override
    public ThemeAllocation createAllocation(ThemeAllocation allocation) {
        return themeAllocationRepository.save(allocation);
    }

    @Override
    public ThemeAllocation updateAllocation(Long id, ThemeAllocation updatedAllocation) {
        ThemeAllocation existing = getAllocationById(id);
        existing.setTheme(updatedAllocation.getTheme());
        existing.setAssetClass(updatedAllocation.getAssetClass());
        existing.setAllocationPercent(updatedAllocation.getAllocationPercent());
        return themeAllocationRepository.save(existing);
    }

    @Override
    public void deleteAllocation(Long id) {
        themeAllocationRepository.deleteById(id);
    }
}
