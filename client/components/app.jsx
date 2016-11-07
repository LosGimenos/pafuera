import React, { Component } from 'react';
import request from 'superagent';
import LandingPage from './landingPage.jsx';
import ResultsPage from './resultsPage.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      brokelynEvents: [],
      brooklynVeganEvents: [],
      villageVoiceEvents: [],
      skintEvents: [],
      step: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStep = this.addStep.bind(this);
    this.removeStep = this.removeStep.bind(this);
    this.changeView = this.changeView.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    request.get('/api/v1/brokelynEvents')
           .then((data) => {
             this.setState({ brokelynEvents: data.body });
           })
           .catch((err) => {
             console.log(err);
           });
    request.get('/api/v1/brooklynVeganEvents')
           .then((data) => {
             this.setState({ brooklynVeganEvents: data.body });
           })
           .catch((err) => {
             console.log(err);
           });
    request.get('/api/v1/villageVoiceEvents')
           .then((data) => {
             this.setState({ villageVoiceEvents: data.body });
           })
           .catch((err) => {
             console.log(err);
           });
    request.get('/api/v1/skintEvents')
           .then((data) => {
             this.setState({ skintEvents: data.body });
           })
           .catch((err) => {
             console.log(err);
           });
    this.addStep();
  }
  addStep() {
    this.setState({ step: this.state.step + 1 });
  }
  removeStep() {
    this.setState({ step: this.state.step - 1 });
  }
  changeView() {
    switch(this.state.step) {
      case 1:
        return <LandingPage
          handleSubmit={this.handleSubmit}
        />;
      case 2:
        return <ResultsPage
          brokelynEvents={this.state.brokelynEvents}
          brooklynVeganEvents={this.state.brooklynVeganEvents}
          villageVoiceEvents={this.state.villageVoiceEvents}
          skintEvents={this.state.skintEvents}
        />;
    }
  }
  render() {
    return (
      <div id="container">
        <div id="header" className="row nav">
          <h2>Pa'Fuera</h2>
          <ul>
            <li onClick={this.removeStep}>Get out there!</li>
          </ul>
        </div>
        <div id="first" className="row">
          {this.changeView()}
        </div>
      </div>
    );
  }
}
