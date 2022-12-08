import React, { Component } from "react";
import ActorDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class ActorList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveActors = this.retrieveActors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveActors = this.setActiveActors.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      actors: [],
      currentActor: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveActors();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveActors() {
    ActorDataService.getAll()
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


  }

  render() {
    const { searchTitle, actors: actors, currentActor: currentActor, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
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
          <h4>Tutorials List</h4>

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

              <Link
                to={"/actors/" + currentActor.id}
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
