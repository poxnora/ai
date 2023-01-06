import React, {Component} from "react";
import ActorDataService from "../services/worker_service";
import {Link} from "react-router-dom";

export default class WorkerList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveActors = this.retrieveActors.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveActors = this.setActiveActors.bind(this);
        this.search = this.search.bind(this);
        this.sortFirstName = this.sortFirstName.bind(this);
        this.sortLastName = this.sortLastName.bind(this);
        this.sortAge = this.sortAge.bind(this);

        this.state = {
            workers: [],
            currentActor: null,
            currentIndex: -1,
            search: "",
            params: {},
        };

    }

    componentDidMount() {
        this.retrieveActors();
    }

    onChangeSearch(e) {
        const search = e.target.value;

        this.setState({
            search: search
        });
    }

    retrieveActors(sort) {
        if (sort === undefined)
            sort = "id";
        this.state.params["sortBy"] = sort;
        this.state.params["search"] = this.state.search;
        ActorDataService.getAll(this.state.params)
            .then(response => {
                this.setState({
                    actors: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveActors();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveActors(actor, index) {
        this.setState({
            currentActor: actor,
            currentIndex: index
        });
    }


    search() {

        this.setState({
            currentActor: null,
            currentIndex: -1
        });
        this.retrieveActors();
    }

    sortFirstName() {
        let sort = 'firstName';
        this.setState({
            currentIndex: -1
        });
        this.retrieveActors(sort);

    }

    sortLastName() {
        let sort = 'lastName';
        this.setState({
            currentIndex: -1
        });
        this.retrieveActors(sort);

    }

    sortAge() {
        let sort = 'age';
        this.setState({
            currentIndex: -1
        });
        this.retrieveActors(sort);

    }

    render() {
        const {search, actors: actors, currentActor: currentActor, currentIndex} = this.state;

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
                    <h4>Workers List</h4>
                    <button className="btn btn-outline-secondary w-33"
                            type="button" onClick={this.sortFirstName}>First Name
                    </button>
                    <button className="btn btn-outline-secondary w-33"
                            type="button" onClick={this.sortLastName}>Last Name
                    </button>
                    <button className="btn btn-outline-secondary w-33"
                            type="button" onClick={this.sortAge}>Age
                    </button>
                    <ul className="list-group">
                        <br>
                        </br>

                        {actors &&
                            actors.map((actor, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveActors(actor, index)}
                                    key={index}
                                >
                                    {actor.firstName} {actor.lastName}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentActor ? (
                        <div>
                            <h4>Details</h4>
                            <br>
                            </br>
                            <br>
                            </br>
                            <div>
                                <label>
                                    <strong>First name:</strong>
                                </label>{" "}
                                {currentActor.firstName}
                            </div>
                            <div>
                                <label>
                                    <strong>Last name:</strong>
                                </label>{" "}
                                {currentActor.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Age:</strong>
                                </label>{" "}
                                {currentActor.age}
                            </div>
                            <div>
                                <label>
                                    <strong>Country:</strong>
                                </label>{" "}
                                {currentActor.country}
                            </div>
                            <Link
                                to={"/workers/" + currentActor.id}
                                className="badge badge-primary w-100 p-2"
                            >
                                Edit
                            </Link>
                            <Link
                                to={"/workers-companies/" + currentActor.id}
                                className="badge badge-success w-100 p-2"
                            >
                                Companies
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
