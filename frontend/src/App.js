import React, {Component} from "react";
import {Link, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddWorker from "./components/addWorker.component";
import Worker from "./components/worker.component";
import WorkerList from "./components/workerList.component";
import AddCompany from "./components/addCompany.component";
import Company from "./components/company.component";
import CompanyList from "./components/companyList.component";
import workerCompany from "./components/workerCompany.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/workers"} className="nav-link">
                                Workers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/companies"} className="nav-link">
                                Companies
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/workers/add"} className="nav-link">
                                Add Worker
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/companies/add"} className="nav-link">
                                Add Company
                            </Link>
                        </li>

                    </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<WorkerList/>}/>
                        <Route path="/workers" element={<WorkerList/>}/>
                        <Route path="/workers/add" element={<AddWorker/>}/>
                        <Route path="/workers/:id" element={<Worker/>}/>
                        <Route path="/companies" element={<CompanyList/>}/>
                        <Route path="/companies/add" element={<AddCompany/>}/>
                        <Route path="/companies/:id" element={<Company/>}/>
                        <Route path="/workers-companies/:id" element={<workerCompany/>}/>

                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
