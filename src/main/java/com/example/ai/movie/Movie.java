package com.example.ai.movie;

import com.example.ai.actor.Actor;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "movies")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String genre;
    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "movies")
    @ToString.Exclude
    private List<Actor> actors;

}
