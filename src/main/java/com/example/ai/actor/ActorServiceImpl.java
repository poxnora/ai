package com.example.ai.actor;

import com.example.ai.exceptions.RecordNotFoundException;
import com.example.ai.exceptions.RecordNotSavedException;
import com.example.ai.movie.Movie;
import com.example.ai.movie.MovieRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ActorServiceImpl implements ActorService {

    ActorRepository actorRepository;
    MovieRepository movieRepository;

    ActorServiceImpl(ActorRepository actorRepository, MovieRepository movieRepository) {
        this.actorRepository = actorRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public Actor getActorById(Long id) {
        return actorRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("No actor with id: " + id + " found"));
    }

    @Override
    public List<Actor> getActors(int pageNo, int pageSize, String sortBy, String sortOrder, String search) {

        Sort sort = sortOrder.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, sort);
        Page<Actor> pagingUser;

        if (search != null) {
            pagingUser = actorRepository.findActorByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(search, search, pageRequest);
            return pagingUser.getContent();
        }
        pagingUser = actorRepository.findAll(pageRequest);
        return pagingUser.getContent();

    }

    @Override
    public Actor addActor(Actor actor) {

        validateActor(actor);
        Actor actorNew = new Actor();
        actorNew.setFirstName(actor.getFirstName());
        actorNew.setLastName(actor.getLastName());
        actorNew.setAge(actor.getAge());
        actorNew.setCountry(actor.getCountry());
        actorNew.setMovies(actor.getMovies());
        return actorRepository.save(actorNew);
    }

    @Override
    public Actor updateActor(Actor actor, Long id) {

        Actor actorUpdated = getActorById(id);
        validateActor(actor);
        actorUpdated.setFirstName(actor.getFirstName());
        actorUpdated.setLastName(actor.getLastName());
        actorUpdated.setAge(actor.getAge());
        actorUpdated.setCountry(actor.getCountry());
        actorUpdated.setMovies(actor.getMovies());
        return actorRepository.save(actorUpdated);
    }


    @Override
    public Actor addActorToMovie(Long movie_id, Long actor_id) {

        Actor actorUpdated = getActorById(actor_id);
        Movie movieUpdated = movieRepository.findById(movie_id).orElseThrow(() -> new RecordNotFoundException("No movie with id: " + movie_id + " found"));
        if (movieUpdated.getActors().contains(actorUpdated))
            throw new RecordNotSavedException("Actor already plays in this movie");
        List<Movie> movieList = actorUpdated.getMovies();
        movieList.add(movieUpdated);
        actorUpdated.setMovies(movieList);
        return actorRepository.save(actorUpdated);


    }

    @Override
    public Actor deleteActorFromMovie(Long movie_id, Long actor_id) {

        Actor actorUpdated = getActorById(actor_id);
        Movie movieUpdated = movieRepository.findById(movie_id).orElseThrow(() -> new RecordNotFoundException("No movie with id: " + movie_id + " found"));
        if (!movieUpdated.getActors().contains(actorUpdated))
            throw new RecordNotSavedException("Actor does not play in this movie");
        List<Movie> movieList = actorUpdated.getMovies();
        movieList.remove(movieUpdated);
        actorUpdated.setMovies(movieList);
        return actorRepository.save(actorUpdated);


    }

    @Override
    public void deleteActor(Long id) {
        Actor actorDeleted = getActorById(id);
        actorRepository.delete(actorDeleted);
    }

    private void validateActor(Actor actor) {
        try {
            Pattern p = Pattern.compile("[^a-złążćęśóñ]", Pattern.CASE_INSENSITIVE);
            Matcher matcherFirstName = p.matcher(actor.getFirstName());
            Matcher matcherLastName = p.matcher(actor.getLastName());
            Matcher matcherCountry = p.matcher(actor.getCountry());
            if (actor.getAge() < 0 || actor.getAge() > 120 || matcherFirstName.find() || matcherLastName.find() || matcherCountry.find()) {
                throw new RecordNotSavedException("Invalid actor data");
            }
        } catch (NullPointerException e) {
            throw new RecordNotSavedException("Invalid actor data, specify name and age");
        }
    }
}
