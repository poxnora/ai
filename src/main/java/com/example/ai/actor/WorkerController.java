package com.example.ai.actor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/workers")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Worker>> getWorkers(@RequestParam(value = "pageNo", defaultValue = "0", required = false) Integer pageNo,
                                                  @RequestParam(value = "pageSize", defaultValue = "100", required = false) Integer pageSize,
                                                  @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                  @RequestParam(value = "sortOrder", defaultValue = "asc", required = false) String sortDir,
                                                  @RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok(workerService.getWorkers(pageNo, pageSize, sortBy, sortDir, search));
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> getWorkersById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(workerService.getWorkerById(id));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> addWorker(@RequestBody Worker worker) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workerService.addWorker(worker));
    }

    @PatchMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> updateWorker(@PathVariable("id") Long id, @RequestBody Worker worker) {
        return ResponseEntity.ok(workerService.updateWorker(worker, id));
    }

    @PutMapping(path = "/{actor_id}/companies/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> addWorkerToCompany(@PathVariable("movie_id") Long movie_id, @PathVariable("actor_id") Long actor_id) {
        return ResponseEntity.ok(workerService.addWorkerToCompany(movie_id, actor_id));
    }

    @DeleteMapping(path = "/{actor_id}/companies/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> deleteWorkerFromCompany(@PathVariable("movie_id") Long movie_id, @PathVariable("actor_id") Long actor_id) {
        return ResponseEntity.ok(workerService.deleteWorkerFromCompany(movie_id, actor_id));
    }

    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Worker> deleteWorker(@PathVariable("id") Long id) {
        workerService.deleteWorker(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}