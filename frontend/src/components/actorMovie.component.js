import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import ActorDataService from "../services/actor.service";
import {withRouter} from '../common/with-router';

class actorMovie extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveMovies = this.retrieveMovies.bind(this);
        this.addActorToMovies = this.addActorToMovies.bind(this);
        this.removeActorFromMovies = this.removeActorFromMovies.bind(this);
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
            actor_id: 0
        };

    }

    componentDidMount() {
        this.state.actor_id = this.props.router.params.id;
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

    addActorToMovies() {

        ActorDataService.addActorToMovie(this.state.actor_id, this.state.currentMovie.id)
            .then(response => {
                alert("Success!");
                this.props.router.navigate('/movies');
            })
            .catch(e => {
                alert("Actor already plays in this movie!");
            });
    }

    removeActorFromMovies() {

        ActorDataService.deleteActorFromMovie(this.state.actor_id, this.state.currentMovie.id)
            .then(response => {
                alert("Success!");
                this.props.router.navigate('/movies');
            })
            .catch(e => {
                alert("Actor doesn't play in this movie!");
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
                    <button
                        className="btn btn-success w-25"
                        type="button"
                        onClick={this.addActorToMovies}
                    >
                        Add
                    </button>
                    <button
                        className="btn btn-danger w-25"
                        type="button"
                        onClick={this.removeActorFromMovies}
                    >
                        Remove
                    </button>
                </div>


            </div>
        );
    }
}

export default withRouter(actorMovie);