
package com.pms.backend.repository;

import com.pms.backend.entity.Security;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecurityRepository extends JpaRepository<Security, Long> {

    Optional<Security> findByIsin(String isin);

    Optional<Security> findBySymbol(String symbol);

    List<Security> findBySector(String sector);
    
    boolean existsByIsin(String isin);
    boolean existsBySymbol(String symbol);
}
