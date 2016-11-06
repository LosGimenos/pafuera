import React, { Component } from 'react';
import BrokelynEventItem from './brokelynEventItem.jsx';
import BrooklynVeganEventItem from './brooklynVeganEventItem.jsx';

const propTypes = {
  brokelynEvents: React.PropTypes.array,
  brooklynVeganEvents: React.PropTypes.array,
  villageVoiceEvents: React.PropTypes.array,
};

export default class ResultsPage extends Component {
  brokelynEvents() {
    return this.props.brokelynEvents.map((event) => {
      return (
        <div className="event-item" >
          <a href={event.eventURL} target="_blank">
          <BrokelynEventItem
            source={event.source}
            cost={event.cost}
            startDate={event.startDate}
            title={event.title}
            eventURL={event.eventURL}
            imgSrc={event.imgSrc}
            address={event.address}
            description={event.description}
          />
          </a>
        </div>
      );
    });
  }
  brooklynVeganEvents() {
    return this.props.brooklynVeganEvents.map((event) => {
      return (
        <div className="event-item" >
          <a href={event.eventURL} target="_blank">
          <BrooklynVeganEventItem
            source={event.source}
            cost={event.cost}
            startDate={event.startDate}
            title={event.title}
            eventURL={event.eventURL}
            imgSrc={event.imgSrc}
            address={event.address}
            description={event.description}
          />
          </a>
        </div>
      );
    });
  }
  villageVoiceEvents() {
    return this.props.villageVoiceEvents.map((event) => {
      return (
        <div className="event-item" >
          <a href={event.eventURL} target="_blank">
          <BrooklynVeganEventItem
            source={event.source}
            cost={event.cost}
            startDate={event.startDate}
            title={event.title}
            eventURL={event.eventURL}
            imgSrc={event.imgSrc}
            address={event.address}
            description={event.description}
          />
          </a>
        </div>
      );
    });
  }
  render() {
    return (
      <div id="results-view-component">
        <div id="brokelyn-events-viewer" className="three">
          <p>Brought to you by Brokelyn!</p>
          {this.brokelynEvents()}
        </div>
        <div id="village-voice-events-viewer" className="three">
          <p>Brought to you by Village Voice!</p>
          {this.villageVoiceEvents()}
        </div>
        <div id="brooklyn-vegan-events-viewer" className="three">
          <p>Brought to you by Brooklyn Vegan!</p>
          {this.brooklynVeganEvents()}
        </div>
        <div id="the-skint-events-viewer" className="three">
        </div>
      </div>
    );
  }
}

ResultsPage.propTypes = propTypes;
