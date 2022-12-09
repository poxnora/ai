package com.example.ai.actor;

import java.util.List;

public interface ActorService {

    Actor getActorById(Long id);

    List<Actor> getActors(int pageNo, int pageSize, String sortBy, String sortOrder, String search);

    Actor addActor(Actor actor);

    Actor updateActor(Actor actor, Long id);

    Actor addActorToMovie(Long movie_id, Long actor_id);

    Actor deleteActorFromMovie(Long movie_id, Long actor_id);

    void deleteActor(Long id);


}
