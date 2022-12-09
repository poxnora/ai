package com.example.ai.actor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/actors")
public class ActorController {

    private final ActorService actorService;

    public ActorController(ActorService actorService) {
        this.actorService = actorService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Actor>> getActors(@RequestParam(value = "pageNo", defaultValue = "0", required = false) Integer pageNo,
                                                 @RequestParam(value = "pageSize", defaultValue = "100", required = false) Integer pageSize,
                                                 @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                 @RequestParam(value = "sortOrder", defaultValue = "asc", required = false) String sortDir,
                                                 @RequestParam(value = "search", required = false) String search) {
        return ResponseEntity.ok(actorService.getActors(pageNo, pageSize, sortBy, sortDir, search));
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> getActorById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(actorService.getActorById(id));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> addActor(@RequestBody Actor actor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(actorService.addActor(actor));
    }

    @PatchMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> updateActor(@PathVariable("id") Long id, @RequestBody Actor actor) {
        return ResponseEntity.ok(actorService.updateActor(actor, id));
    }

    @PutMapping(path = "/{actor_id}/movies/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> addActorToMovie(@PathVariable("movie_id") Long movie_id, @PathVariable("actor_id") Long actor_id) {
        return ResponseEntity.ok(actorService.addActorToMovie(movie_id, actor_id));
    }

    @DeleteMapping(path = "/{actor_id}/movies/{movie_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> deleteActorFromMovie(@PathVariable("movie_id") Long movie_id, @PathVariable("actor_id") Long actor_id) {
        return ResponseEntity.ok(actorService.deleteActorFromMovie(movie_id, actor_id));
    }

    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> deleteActor(@PathVariable("id") Long id) {
        actorService.deleteActor(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}