import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddActor from "./components/addActor.component";
import Actor from "./components/actor.component";
import ActorList from "./components/actorList.component";
import AddMovie from "./components/addMovie.component";
import Movie from "./components/movie.component";
import MovieList from "./components/movieList.component";
import ActorMovie from "./components/actorMovie.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/actors"} className="nav-link">
                                Actors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/movies"} className="nav-link">
                                Movies
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/actors/add"} className="nav-link">
                                Add Actor
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/movies/add"} className="nav-link">
                                Add Movie
                            </Link>
                        </li>

                    </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<ActorList/>}/>
                        <Route path="/actors" element={<ActorList/>}/>
                        <Route path="/actors/add" element={<AddActor/>}/>
                        <Route path="/actors/:id" element={<Actor/>}/>
                        <Route path="/movies" element={<MovieList/>}/>
                        <Route path="/movies/add" element={<AddMovie/>}/>
                        <Route path="/movies/:id" element={<Movie/>}/>
                        <Route path="/actors-movies/:id" element={<ActorMovie/>}/>

                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
