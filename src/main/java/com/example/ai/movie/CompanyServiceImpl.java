package com.example.ai.movie;

import com.example.ai.exceptions.RecordNotFoundException;
import com.example.ai.exceptions.RecordNotSavedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CompanyServiceImpl implements CompanyService {

    CompanyRepository companyRepository;

    CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("No Company with id: " + id + " found"));
    }

    @Override
    public Company getCompanyByName(String name) {
        return companyRepository.findCompanyByName(name).orElseThrow(() -> new RecordNotFoundException("No Company with title: " + name + " found"));
    }

    @Override
    public List<Company> getCompany(int pageNo, int pageSize, String sortBy, String sortOrder, String search) {

        Sort sort = sortOrder.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sort);
        Page<Company> pagingMovie;
        if (search != null) {
            pagingMovie = companyRepository.findCompanyByNameContainingIgnoreCaseOrBranchContainingIgnoreCase(search, search, pageRequest);
            return pagingMovie.getContent();
        }
        pagingMovie = companyRepository.findAll(pageRequest);
        return pagingMovie.getContent();
    }

    @Override
    public Company addCompany(Company company) {
        Company companyNew = new Company();
        companyNew.setName(company.getName());
        companyNew.setBranch(company.getBranch());
        Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
        Matcher matcher = p.matcher(company.getCity());
        if(matcher.find())
            throw new RecordNotSavedException("Invalid data");
        companyNew.setCity(company.getCity());
        companyNew.setWorkers(company.getWorkers());
        return companyRepository.save(companyNew);
    }

    @Override
    public Company updateCompanies(Company company, Long id) {
        Company companyUpdated = getCompanyById(id);
        companyUpdated.setName(company.getName());
        companyUpdated.setBranch(company.getBranch());
        Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
        Matcher matcher = p.matcher(company.getCity());
        if(matcher.find())
            throw new RecordNotSavedException("Invalid data");
        companyUpdated.setCity(company.getCity());
        return companyRepository.save(companyUpdated);
    }

    @Override
    public void deleteCompany(Long id) {
        Company companyDeleted = getCompanyById(id);
        companyRepository.delete(companyDeleted);

    }


}
