package com.example.ai.movie;

import com.example.ai.actor.Actor;
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
public class MovieServiceImpl implements MovieService {

    MovieRepository movieRepository;

    MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("No movie with id: " + id + " found"));
    }

    @Override
    public Movie getMovieByTitle(String title) {
        return movieRepository.findMovieByTitle(title).orElseThrow(() -> new RecordNotFoundException("No movie with title: " + title + " found"));
    }

    @Override
    public List<Movie> getMovies(int pageNo, int pageSize, String sortBy, String sortOrder, String search) {

        Sort sort = sortOrder.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sort);
        Page<Movie> pagingMovie;
        if (search != null) {
            pagingMovie = movieRepository.findMovieByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(search, search, pageRequest);
            return pagingMovie.getContent();
        }
        pagingMovie = movieRepository.findAll(pageRequest);
        return pagingMovie.getContent();
    }

    @Override
    public Movie addMovie(Movie movie) {
        Movie movieNew = new Movie();
        movieNew.setTitle(movie.getTitle());
        movieNew.setDescription(movie.getDescription());
        Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
        Matcher matcher = p.matcher(movie.getGenre());
        if(matcher.find())
            throw new RecordNotSavedException("Invalid data");
        movieNew.setGenre(movie.getGenre());
        movieNew.setActors(movie.getActors());
        return movieRepository.save(movieNew);
    }

    @Override
    public Movie updateMovie(Movie movie, Long id) {
        Movie movieUpdated = getMovieById(id);
        movieUpdated.setTitle(movie.getTitle());
        movieUpdated.setDescription(movie.getDescription());
        Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
        Matcher matcher = p.matcher(movie.getGenre  ());
        if(matcher.find())
            throw new RecordNotSavedException("Invalid data");
        movieUpdated.setGenre(movie.getGenre());
        movieUpdated.setActors(movie.getActors());
        return movieRepository.save(movieUpdated);
    }

    @Override
    public void deleteMovie(Long id) {
        Movie movieDeleted = getMovieById(id);
        movieRepository.delete(movieDeleted);

    }


}
