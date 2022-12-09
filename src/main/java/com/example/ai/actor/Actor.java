package com.example.ai.actor;

import com.example.ai.movie.Movie;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "actors")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String country;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "actors_movies", joinColumns = {@JoinColumn(name = "users_id")}, inverseJoinColumns = {@JoinColumn(name = "movies_id")})
    @ToString.Exclude
    @JsonIgnore
    private List<Movie> movies;
}
