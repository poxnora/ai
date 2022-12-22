import React, {Component} from "react";
import WorkerDataService from "../services/company_service";

export default class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.addCompany = this.addCompany.bind(this);
        this.newCompany = this.newCompany.bind(this);

        this.state = {
            id: null,
            name: "",
            city: "",
            branch: "",
            workers: []
        };

    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeBranch(e) {
        this.setState({
            branch: e.target.value
        });
    }

    addCompany() {
        const data = {
            name: this.state.name,
            city: this.state.city,
            branch: this.state.branch
        };

        WorkerDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    city: response.data.city,
                    branch: response.data.branch,
                });
                console.log(response.data);
                alert("Added new company!");
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    newCompany() {
        this.setState({
            id: null,
            name: "",
            city: "",
            branch: "",
            workers: [],
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
                            onChange={this.onChangeName}
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
                            value={this.state.city}
                            onChange={this.onChangeCity}
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
                            onChange={this.onChangeBranch}
                            name="Genre"
                        />
                    </div>
                    <button onClick={this.addCompany} className="btn btn-success w-100">
                        Submit
                    </button>
                </div>

            </div>
        );
    }
}
