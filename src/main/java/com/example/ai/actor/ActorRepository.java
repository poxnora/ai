package com.example.ai.actor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Long> {

    Page<Actor> findActorByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String search, String search1, Pageable pageable);
}
