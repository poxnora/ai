package com.example.ai.actor;

import java.util.List;

public interface WorkerService {

    Worker getWorkerById(Long id);

    List<Worker> getWorkers(int pageNo, int pageSize, String sortBy, String sortOrder, String search);

    Worker addWorker(Worker worker);

    Worker updateWorker(Worker worker, Long id);

    Worker addWorkerToCompany(Long company_id, Long worker_id);

    Worker deleteWorkerFromCompany(Long company_id, Long worker_id);

    void deleteWorker(Long id);


}
