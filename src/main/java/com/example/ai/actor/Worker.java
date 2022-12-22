package com.example.ai.actor;

import com.example.ai.movie.Company;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "workers")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String country;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "workers_companies", joinColumns = {@JoinColumn(name = "workers_id")}, inverseJoinColumns = {@JoinColumn(name = "companies_id")})
    @ToString.Exclude
    @JsonIgnore
    private List<Company> companies;
}
