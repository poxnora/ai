import React, {Component} from "react";
import ActorDataService from "../services/actor.service";

export default class AddActor extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.addActor = this.addActor.bind(this);
        this.newActor = this.newActor.bind(this);

        this.state = {
            id: null,
            firstName: "",
            lastName: "",
            country: "",
            age: 0,
        };

    }

    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onChangeTitle(e) {
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
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            country: this.state.country
        };

        ActorDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    age: response.data.age,
                    country: response.data.country
                });
                console.log(response.data);
                alert("Added new actor!");
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    newActor() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",
            age: 0,
            country: "",
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
                            onChange={this.onChangeTitle}
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
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            required
                            value={this.state.country}
                            onChange={this.onChangeCountry}
                            name="country"
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
