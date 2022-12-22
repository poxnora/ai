package com.example.ai.movie;

import com.example.ai.actor.Worker;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "companies")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String branch;
    private String city;
    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "companies")
    @ToString.Exclude
    private List<Worker> workers;

}
