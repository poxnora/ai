package com.example.ai.movie;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Optional<Movie> findMovieByTitle(String title);

    Page<Movie> findMovieByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(String search, String search1, Pageable pageable);

}
