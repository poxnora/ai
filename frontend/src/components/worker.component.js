import React, {Component} from "react";
import WorkerService from "../services/worker_service";
import {withRouter} from '../common/with-router';

class Worker extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.getActor = this.getActor.bind(this);
        this.updateActor = this.updateActor.bind(this);
        this.deleteActor = this.deleteActor.bind(this);

        this.state = {
            currentActor: {
                id: null,
                firstName: "",
                lastName: "",
                age: 0,
                country: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getActor(this.props.router.params.id);


    }

    onChangeFirstName(e) {
        const firstName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentActor: {
                    ...prevState.currentActor,
                    firstName: firstName
                }
            };
        });
    }

    onChangeLastName(e) {
        const lastName = e.target.value;

        this.setState(prevState => ({
            currentActor: {
                ...prevState.currentActor,
                lastName: lastName
            }
        }));
    }

    onChangeAge(e) {
        const age = e.target.value;

        this.setState(prevState => ({
            currentActor: {
                ...prevState.currentActor,
                age: age
            }
        }));
    }

    onChangeCountry(e) {
        const country = e.target.value;

        this.setState(prevState => ({
            currentActor: {
                ...prevState.currentActor,
                country: country
            }
        }));
    }

    getActor(id) {
        WorkerService.get(id)
            .then(response => {
                this.setState({
                    currentActor: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateActor() {
        WorkerService.update(
            this.state.currentActor.id,
            this.state.currentActor
        )
            .then(response => {
                console.log(response.data);
                alert("Updated actor!");
                this.props.router.navigate('/workers');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }


    deleteActor() {
        WorkerService.delete(this.state.currentActor.id)
            .then(response => {
                console.log(response.data);
                alert("Deleted actor!");
                this.props.router.navigate('/workers');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    render() {
        const {currentActor} = this.state;

        return (
            <div>
                {currentActor ? (
                    <div className="edit-form">
                        <h4>Edit Worker</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={currentActor.firstName}
                                    onChange={this.onChangeFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={currentActor.lastName}
                                    onChange={this.onChangeLastName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    value={currentActor.age}
                                    onChange={this.onChangeAge}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    value={currentActor.country}
                                    onChange={this.onChangeCountry}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger w-50"
                            onClick={this.deleteActor}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success w-50"
                            onClick={this.updateActor}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Select Worker</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Worker);