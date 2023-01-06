import React, {Component} from "react";
import MovieDataService from "../services/company_service";
import WorkerDataService from "../services/worker_service";
import {withRouter} from '../common/with-router';

class workerCompany extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveCompanies = this.retrieveCompanies.bind(this);
        this.addWorkerToCompany = this.addWorkerToCompany.bind(this);
        this.removeWorkerFromCompany = this.removeWorkerFromCompany.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCompany = this.setActiveCompany.bind(this);
        this.search = this.search.bind(this);
        this.sortName = this.sortName.bind(this);


        this.state = {
            companies: [],
            currentCompany: null,
            currentIndex: -1,
            search: "",
            workers: [],
            params: {},
            worker_id: 0
        };

    }

    componentDidMount() {
        this.state.worker_id = this.props.router.params.id;
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
        MovieDataService.getAll(this.state.params)
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

    addWorkerToCompany() {

        WorkerDataService.addActorToMovie(this.state.worker_id, this.state.currentCompany.id)
            .then(response => {
                alert("Success!");
                this.props.router.navigate('/companies');
            })
            .catch(e => {
                alert("Worker already works in this company!");
            });
    }

    removeWorkerFromCompany() {

        WorkerDataService.deleteActorFromMovie(this.state.worker_id, this.state.currentCompany.id)
            .then(response => {
                alert("Success!");
                this.props.router.navigate('/companies');
            })
            .catch(e => {
                alert("Worker doesn't work in this company!");
            });
    }

    refreshList() {
        this.retrieveCompanies();
        this.setState({
            currentCompany: null,
            currentIndex: -1
        });
    }

    setActiveCompany(worker, index) {
        this.setState({
            currentCompany: worker,
            currentIndex: index
        });
    }


    search() {

        this.setState({
            currentCompany: null,
            currentIndex: -1
        });
        this.retrieveCompanies();
    }

    sortName() {
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
                            type="button" onClick={this.sortName}>Name
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
                                    onClick={() => this.setActiveCompany(companies, index)}
                                    key={index}
                                >
                                    {companies.name}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="btn btn-success w-25"
                        type="button"
                        onClick={this.addWorkerToCompany}
                    >
                        Add
                    </button>
                    <button
                        className="btn btn-danger w-25"
                        type="button"
                        onClick={this.removeWorkerFromCompany}
                    >
                        Remove
                    </button>
                </div>


            </div>
        );
    }
}

export default withRouter(workerCompany);