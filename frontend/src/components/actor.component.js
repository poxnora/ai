import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';

class Actor extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.getActor = this.getActor.bind(this);
    this.updateActor = this.updateActor.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentActor: {
        id: null,
        firstName: "",
        lastName: "",
        age: 0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getActor(this.props.router.params.id);
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;

    this.setState(function(prevState) {
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

  getActor(id) {
    TutorialDataService.get(id)
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
    TutorialDataService.update(
      this.state.currentActor.id,
      this.state.currentActor
    )
      .then(response => {
        console.log(response.data);
        alert("Updated actor!");
        this.props.router.navigate('/actors');
      })
      .catch(e => {
        console.log(e);
        alert("Error!");
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentActor.id)
      .then(response => {
        console.log(response.data);
        alert("Deleted actor!");
        this.props.router.navigate('/actors');
      })
      .catch(e => {
        console.log(e);
        alert("Error!");
      });
  }

  render() {
    const { currentActor } = this.state;

    return (
      <div>
        {currentActor ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
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
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateActor}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Select Actor</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Actor);