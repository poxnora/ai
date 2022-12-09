import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import {Link} from "react-router-dom";

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveMovies = this.retrieveMovies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMovies = this.setActiveMovies.bind(this);
        this.search = this.search.bind(this);
        this.sortTitle = this.sortTitle.bind(this);


        this.state = {
            movies: [],
            currentMovie: null,
            currentIndex: -1,
            search: "",
            actors: [],
            params: {},
        };

    }

    componentDidMount() {
        this.retrieveMovies();
    }

    onChangeSearch(e) {
        const search = e.target.value;

        this.setState({
            search: search
        });
    }

    retrieveMovies(sort, search) {
        if (sort === undefined)
            sort = "id";
        this.state.params["sortBy"] = sort;
        this.state.params["search"] = this.state.search;
        MovieDataService.getAll(this.state.params)
            .then(response => {
                this.setState({
                    movies: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMovies();
        this.setState({
            currentMovie: null,
            currentIndex: -1
        });
    }

    setActiveMovies(actor, index) {
        this.setState({
            currentMovie: actor,
            currentIndex: index
        });
    }


    search() {

        this.setState({
            currentActor: null,
            currentIndex: -1
        });
        this.retrieveMovies();
    }

    sortTitle() {
        let sort = 'Title';
        this.setState({
            currentIndex: -1
        });
        this.retrieveMovies(sort);

    }


    render() {
        const {search, movies: movies, currentMovie: currentMovie, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={search}
                            onChange={this.onChangeSearch}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.search}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Movies List</h4>
                    <button className="btn btn-outline-secondary 50"
                            type="button" onClick={this.sortTitle}>Title
                    </button>
                    <ul className="list-group">
                        <br>
                        </br>

                        {movies &&
                            movies.map((movies, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveMovies(movies, index)}
                                    key={index}
                                >
                                    {movies.title}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentMovie ? (
                        <div>
                            <h4>Details</h4>
                            <br>
                            </br>
                            <br>
                            </br>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentMovie.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:<br>
                                    </br></strong>
                                </label>{" "}
                                <br>
                                </br>
                                {currentMovie.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Genre:</strong>
                                </label>{" "}
                                {currentMovie.genre}
                            </div>
                            <div>
                                <label>
                                    <strong>Actors:</strong>
                                </label>{" "}
                                {Object.keys(currentMovie.actors).map(function (keyName, keyIndex) {
                                    return (
                                        <li key={keyName}>
                                            {currentMovie.actors[keyName]["firstName"]} {currentMovie.actors[keyName]["lastName"]}

                                        </li>
                                    )

                                })}
                                <br>
                                </br>
                            </div>
                            <Link
                                to={"/movies/" + currentMovie.id}
                                className="badge badge-primary w-50 p-2"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </div>
            </div>
        );
    }
}
