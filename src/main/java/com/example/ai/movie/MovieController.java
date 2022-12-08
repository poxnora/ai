package com.example.ai.movie;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Movie>> getMovies(@RequestParam(value = "pageNo", defaultValue = "0", required = false) Integer pageNo,
                                                 @RequestParam(value = "pageSize", defaultValue = "100", required = false) Integer pageSize,
                                                 @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                                 @RequestParam(value = "sortOrder", defaultValue = "asc", required = false) String sortDir) {
        return ResponseEntity.ok(movieService.getMovies(pageNo, pageSize, sortBy, sortDir));
    }

    @GetMapping(path = "/title/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> getMovieByTitle(@PathVariable("title") String title) {
        return ResponseEntity.ok(movieService.getMovieByTitle(title));
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.status(HttpStatus.CREATED).body(movieService.addMovie(movie));
    }

    @PatchMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> updateMovie(@PathVariable("id") Long id, @RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.updateMovie(movie, id));
    }


    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> deleteMovie(@PathVariable("id") Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}