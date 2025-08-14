package com.pms.backend.controller;

import com.pms.backend.entity.Security;
import com.pms.backend.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200") // Angular frontend
@RestController
@RequestMapping("/api/securities")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    // GET all securities
    @GetMapping
    public ResponseEntity<List<Security>> getAllSecurities() {
        return ResponseEntity.ok(securityService.getAllSecurities());
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<Security> getSecurityById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(securityService.getSecurityById(id));
    }

    // GET by ISIN
    @GetMapping("/isin/{isin}")
    public ResponseEntity<Security> getSecurityByIsin(@PathVariable String isin) {
        return ResponseEntity.ok(securityService.getSecurityByIsin(isin));
    }

    // GET by Symbol
    @GetMapping("/symbol/{symbol}")
    public ResponseEntity<Security> getSecurityBySymbol(@PathVariable String symbol) {
        return ResponseEntity.ok(securityService.getSecurityBySymbol(symbol));
    }

    // GET by Sector
    @GetMapping("/sector/{sector}")
    public ResponseEntity<List<Security>> getSecuritiesBySector(@PathVariable String sector) {
        return ResponseEntity.ok(securityService.getSecuritiesBySector(sector));
    }

    // POST - Create new security
    @PostMapping
    public ResponseEntity<Security> createSecurity(@RequestBody Security security) {
        return ResponseEntity.ok(securityService.createSecurity(security));
    }

    // PUT - Update security
    @PutMapping("/{id}")
    public ResponseEntity<Security> updateSecurity(@PathVariable Long id, @RequestBody Security updatedSecurity) {
        return ResponseEntity.ok(securityService.updateSecurity(id, updatedSecurity));
    }

    // DELETE - Delete security
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSecurity(@PathVariable Long id) {
        securityService.deleteSecurity(id);
        return ResponseEntity.noContent().build();
    }
}
