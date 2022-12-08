import React, { Component } from "react";
import ActorDataService from "../services/tutorial.service";

export default class AddActor extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.addActor = this.addActor.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      age: 0,
    };

  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  addActor() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age
    };

    ActorDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
        });
        console.log(response.data);
        alert("Added new actor!");
      })
      .catch(e => {
        console.log(e);
        alert("Error!");
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      age: 0,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form ">
          <div>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                  type="number"
                  className="form-control"
                  id="age"
                  required
                  value={this.state.age}
                  onChange={this.onChangeAge}
                  name="age"
              />
            </div>
            <button onClick={this.addActor} className="btn btn-success w-100">
              Submit
            </button>
          </div>

      </div>
    );
  }
}
