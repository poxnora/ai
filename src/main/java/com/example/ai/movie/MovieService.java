package com.example.ai.movie;

import java.util.List;

public interface MovieService {


    Movie getMovieById(Long id);

    Movie getMovieByTitle(String title);

    List<Movie> getMovies(int pageNo, int pageSize, String sortBy, String sortOrder);

    Movie addMovie(Movie actor);

    Movie updateMovie(Movie actor, Long id);

    void deleteMovie(Long id);
}
