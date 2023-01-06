import React, {Component} from "react";
import CompanyDataService from "../services/company_service";
import {withRouter} from '../common/with-router';

class Company extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.getWorker = this.getWorker.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

        this.state = {
            currentCompany: {
                id: null,
                name: "",
                city: "",
                branch: "",
                workers: []
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getWorker(this.props.router.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCompany: {
                    ...prevState.currentCompany,
                    name: name
                }
            };
        });
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(prevState => ({
            currentCompany: {
                ...prevState.currentCompany,
                city: city
            }
        }));
    }

    onChangeBranch(e) {
        const branch = e.target.value;

        this.setState(prevState => ({
            currentCompany: {
                ...prevState.currentCompany,
                branch: branch
            }
        }));
    }

    getWorker(id) {
        CompanyDataService.get(id)
            .then(response => {
                this.setState({
                    currentCompany: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    updateCompany() {
        CompanyDataService.update(
            this.state.currentCompany.id,
            this.state.currentCompany
        )
            .then(response => {
                console.log(response.data);
                alert("Updated company!");
                this.props.router.navigate('/companies');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    deleteCompany() {
        CompanyDataService.delete(this.state.currentCompany.id)
            .then(response => {
                console.log(response.data);
                alert("Deleted company!");
                this.props.router.navigate('/companies');
            })
            .catch(e => {
                console.log(e);
                alert("Error!");
            });
    }

    render() {
        const {currentCompany} = this.state;

        return (
            <div>
                {currentCompany ? (
                    <div className="edit-form">
                        <h4>Edit Company</h4>
                        <form>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={currentCompany.name}
                                        onChange={this.onChangeName}
                                        name="name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        value={currentCompany.city}
                                        onChange={this.onChangeCity}
                                        name="city"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="branch">Branch</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="branch"
                                        value={currentCompany.branch}
                                        onChange={this.onChangeBranch}
                                        name="branch"
                                    />
                                </div>
                            </div>
                        </form>

                        <button
                            className="badge badge-danger  w-50"
                            onClick={this.deleteCompany}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success w-50"
                            onClick={this.updateCompany}
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Select Company</p>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Company);