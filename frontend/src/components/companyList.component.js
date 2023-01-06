import React, {Component} from "react";
import CompanyDataService from "../services/company_service";
import {Link} from "react-router-dom";

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCompanies = this.setActiveCompanies.bind(this);
        this.search = this.search.bind(this);
        this.sortTitle = this.sortTitle.bind(this);


        this.state = {
            companies: [],
            currentCompany: null,
            currentIndex: -1,
            search: "",
            workers: [],
            params: {},
        };

    }

    componentDidMount() {
        this.retrieveCompanies();
    }

    onChangeSearch(e) {
        const search = e.target.value;

        this.setState({
            search: search
        });
    }

    retrieveCompanies(sort, search) {
        if (sort === undefined)
            sort = "id";
        this.state.params["sortBy"] = sort;
        this.state.params["search"] = this.state.search;
        CompanyDataService.getAll(this.state.params)
            .then(response => {
                this.setState({
                    companies: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveCompanies();
        this.setState({
            currentMovie: null,
            currentIndex: -1
        });
    }

    setActiveCompanies(actor, index) {
        this.setState({
            currentCompany: actor,
            currentIndex: index
        });
    }


    search() {

        this.setState({
            currentWorker: null,
            currentIndex: -1
        });
        this.retrieveCompanies();
    }

    sortTitle() {
        let sort = 'Name';
        this.setState({
            currentIndex: -1
        });
        this.retrieveCompanies(sort);

    }


    render() {
        const {search, companies: companies, currentCompany: currentCompany, currentIndex} = this.state;

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
                    <h4>Companies List</h4>
                    <button className="btn btn-outline-secondary 50"
                            type="button" onClick={this.sortTitle}>Name
                    </button>
                    <ul className="list-group">
                        <br>
                        </br>

                        {companies &&
                            companies.map((companies, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveCompanies(companies, index)}
                                    key={index}
                                >
                                    {companies.name}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentCompany ? (
                        <div>
                            <h4>Details</h4>
                            <br>
                            </br>
                            <br>
                            </br>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentCompany.name}
                            </div>
                            <div>
                                <label>
                                    <strong>City:<br>
                                    </br></strong>
                                </label>{" "}
                                <br>
                                </br>
                                {currentCompany.city}
                            </div>
                            <div>
                                <label>
                                    <strong>Branch:</strong>
                                </label>{" "}
                                {currentCompany.branch}
                            </div>
                            <div>
                                <label>
                                    <strong>Workers:</strong>
                                </label>{" "}
                                {Object.keys(currentCompany.workers).map(function (keyName, keyIndex) {
                                    return (
                                        <li key={keyName}>
                                            {currentCompany.workers[keyName]["firstName"]} {currentCompany.workers[keyName]["lastName"]}

                                        </li>
                                    )

                                })}
                                <br>
                                </br>
                            </div>
                            <Link
                                to={"/companies/" + currentCompany.id}
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
