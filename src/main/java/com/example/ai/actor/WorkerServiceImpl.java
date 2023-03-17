package com.example.ai.actor;

import com.example.ai.exceptions.RecordNotFoundException;
import com.example.ai.exceptions.RecordNotSavedException;
import com.example.ai.movie.Company;
import com.example.ai.movie.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class WorkerServiceImpl implements WorkerService {

    WorkerRepository workerRepository;
    CompanyRepository companyRepository;

    WorkerServiceImpl(WorkerRepository workerRepository, CompanyRepository companyRepository) {
        this.workerRepository = workerRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public Worker getWorkerById(Long id) {

        return workerRepository.findById(id).orElseThrow(() ->
                new RecordNotFoundException("No worker with id: " + id + " found"));
    }

    @Override
    public List<Worker> getWorkers(int pageNo, int pageSize, String sortBy, String sortOrder, String search) {

        Sort sort = sortOrder.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sort);
        Page<Worker> pagingUser;

        if (search != null) {
            pagingUser = workerRepository.findWorkerByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase
                    (search, search, pageRequest);
            return pagingUser.getContent();
        }
        pagingUser = workerRepository.findAll(pageRequest);
        return pagingUser.getContent();

    }

    @Override
    public Worker addWorker(Worker worker) {

        validateActor(worker);
        Worker workerNew = new Worker();
        workerNew.setFirstName(worker.getFirstName());
        workerNew.setLastName(worker.getLastName());
        workerNew.setAge(worker.getAge());
        workerNew.setCountry(worker.getCountry());
        workerNew.setCompanies(worker.getCompanies());
        return workerRepository.save(workerNew);
    }

    @Override
    public Worker updateWorker(Worker worker, Long id) {

        Worker workerUpdated = getWorkerById(id);
        validateActor(worker);
        workerUpdated.setFirstName(worker.getFirstName());
        workerUpdated.setLastName(worker.getLastName());
        workerUpdated.setAge(worker.getAge());
        workerUpdated.setCountry(worker.getCountry());
        workerUpdated.setCompanies(worker.getCompanies());
        return workerRepository.save(workerUpdated);
    }


    @Override
    public Worker addWorkerToCompany(Long company_id, Long worker_id) {

        Worker workerUpdated = getWorkerById(worker_id);
        Company companyUpdated = companyRepository.findById(company_id).orElseThrow(() -> new RecordNotFoundException("No worker with id: " + company_id + " found"));
        if (companyUpdated.getWorkers().contains(workerUpdated))
            throw new RecordNotSavedException("Actor already plays in this movie");
        List<Company> companyList = workerUpdated.getCompanies();
        companyList.add(companyUpdated);
        workerUpdated.setCompanies(companyList);
        return workerRepository.save(workerUpdated);


    }

    @Override
    public Worker deleteWorkerFromCompany(Long company_id, Long worker_id) {

        Worker workerUpdated = getWorkerById(worker_id);
        Company companyUpdated = companyRepository.findById(company_id).orElseThrow(() ->
                new RecordNotFoundException("No worker with id: " + company_id + " found"));
        if (!companyUpdated.getWorkers().contains(workerUpdated))
            throw new RecordNotSavedException("That worker does not work in this company");
        List<Company> companyList = workerUpdated.getCompanies();
        companyList.remove(companyUpdated);
        workerUpdated.setCompanies(companyList);
        return workerRepository.save(workerUpdated);


    }

    @Override
    public void deleteWorker(Long id) {
        Worker workerDeleted = getWorkerById(id);
        workerRepository.delete(workerDeleted);
    }

    private void validateActor(Worker worker) {
        try {
            Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
            Matcher matcherFirstName = p.matcher(worker.getFirstName());
            Matcher matcherLastName = p.matcher(worker.getLastName());
            Matcher matcherCountry = p.matcher(worker.getCountry());
            if (worker.getAge() < 0 || worker.getAge() > 120
                    || matcherFirstName.find() || matcherLastName.find() || matcherCountry.find()) {
                throw new RecordNotSavedException("Invalid worker data");
            }
        } catch (NullPointerException e) {
            throw new RecordNotSavedException("Invalid worker data, specify name and age");
        }
    }
}
