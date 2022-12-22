package com.example.ai.movie;

import java.util.List;

public interface CompanyService {


    Company getCompanyById(Long id);

    Company getCompanyByName(String title);

    List<Company> getCompany(int pageNo, int pageSize, String sortBy, String sortOrder, String search);

    Company addCompany(Company actor);

    Company updateCompanies(Company actor, Long id);

    void deleteCompany(Long id);
}
