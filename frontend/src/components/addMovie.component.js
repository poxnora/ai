import React, {Component} from "react";
import MovieDataService from "../services/movie.service";

export default class AddActor extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.newMovie = this.newMovie.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            genre: "",
            actors: []
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeGenre(e) {
        this.setState({
            genre: e.target.value
        });
    }

    addMovie() {
        const data = {
            title: this.state.title,
            description: this.state.description,
            genre: this.state.genre
        };

        MovieDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    genre: response.data.genre,
                });
                console.log(response.data);
                alert("Added new movie!");
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    newMovie() {
        this.setState({
            id: null,
            title: "",
            description: "",
            genre: "",
            actors: [],
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form ">
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.title}
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
                            required
                            value={this.state.description}
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
                            required
                            value={this.state.genre}
                            onChange={this.onChangeGenre}
                            name="Genre"
                        />
                    </div>
                    <button onClick={this.addMovie} className="btn btn-success w-100">
                        Submit
                    </button>
                </div>

            </div>
        );
    }
}
