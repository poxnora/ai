import React, {Component} from "react";
import MovieDataService from "../services/movie.service";
import {withRouter} from '../common/with-router';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.getActor = this.getActor.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {
            currentMovie: {
                id: null,
                title: "",
                description: "",
                genre: "",
                actors: []
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getActor(this.props.router.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMovie: {
                    ...prevState.currentMovie,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentMovie: {
                ...prevState.currentMovie,
                description: description
            }
        }));
    }

    onChangeGenre(e) {
        const genre = e.target.value;

        this.setState(prevState => ({
            currentMovie: {
                ...prevState.currentMovie,
                genre: genre
            }
        }));
    }

    getActor(id) {
        MovieDataService.get(id)
            .then(response => {
                this.setState({
                    currentMovie: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateMovie() {
        MovieDataService.update(
            this.state.currentMovie.id,
            this.state.currentMovie
        )
            .then(response => {
                console.log(response.data);
                alert("Updated movie!");
                this.props.router.navigate('/movies');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    deleteMovie() {
        MovieDataService.delete(this.state.currentMovie.id)
            .then(response => {
                console.log(response.data);
                alert("Deleted movie!");
                this.props.router.navigate('/movies');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    render() {
        const {currentMovie} = this.state;

        return (
            <div>
                {currentMovie ? (
                    <div className="edit-form">
                        <h4>Edit Movie</h4>
                        <form>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={currentMovie.title}
                                        onChange={this.onChangeTitle}
                                        name="title"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={currentMovie.description}
                                        onChange={this.onChangeDescription}
                                        name="description"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Genre">Genre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Genre"
                                        value={currentMovie.genre}
                                        onChange={this.onChangeGenre}
                                        name="Genre"
                                    />
                                </div>
                            </div>
                        </form>

                        <button
                            className="badge badge-danger  w-50"
                            onClick={this.deleteMovie}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success w-50"
                            onClick={this.updateMovie}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Select Movie</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Movie);