import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddActor from "./components/addActor.component";
import Actor from "./components/actor.component";
import ActorList from "./components/actorList.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/actors"} className="nav-link">
                Actors
              </Link>
            </li>
              <li className="nav-item">
                <Link to={"/movies"} className="nav-link">
                  Movies
                </Link>
              </li>

            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ActorList/>} />
            <Route path="/actors" element={<ActorList/>} />
            <Route path="/add" element={<AddActor/>} />
            <Route path="/actors/:id" element={<Actor/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
