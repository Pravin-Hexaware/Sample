package com.pms.backend.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pms.backend.entity.AssetClass;
import com.pms.backend.repository.AssetClassRepository;
import com.pms.backend.service.AssetClassService;

@Service
public class AssetClassServiceImpl implements AssetClassService {

    @Autowired
    private AssetClassRepository repository;

    @Override
    public List<AssetClass> getAll() {
        return repository.findAll();
    }

    @Override
    public AssetClass getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public AssetClass save(AssetClass assetClass) {
        return repository.save(assetClass);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}