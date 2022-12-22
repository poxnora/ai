package com.example.ai.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findCompanyByName(String title);

    Page<Company> findCompanyByNameContainingIgnoreCaseOrBranchContainingIgnoreCase(String search, String search1, Pageable pageable);

}
