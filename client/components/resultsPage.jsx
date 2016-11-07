import React, { Component } from 'react';
import BrokelynEventItem from './brokelynEventItem.jsx';
import BrooklynVeganEventItem from './brooklynVeganEventItem.jsx';
import VillageVoiceEventItem from './villageVoiceEventItem.jsx';
import SkintEventItem from './skintEventItem.jsx';

const propTypes = {
  brokelynEvents: React.PropTypes.array,
  brooklynVeganEvents: React.PropTypes.array,
  villageVoiceEvents: React.PropTypes.array,
  skintEvents: React.PropTypes.array,
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
        <div className="event-item-odd" >
          <a href={event.eventURL} target="_blank">
          <VillageVoiceEventItem
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
  skintEvents() {
    return this.props.skintEvents.map((event) => {
      return (
        <div className="event-item-odd" >
          <a href={event.eventURL} target="_blank">
          <SkintEventItem
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
          <div id="brokelyn-logo-div"></div>
          {this.brokelynEvents()}
        </div>
        <div id="village-voice-events-viewer" className="three">
          <p>Brought to you by Village Voice!</p>
          <div id="village-voice-logo-div"></div>
          {this.villageVoiceEvents()}
        </div>
        <div id="brooklyn-vegan-events-viewer" className="two">
          <p>Brought to you by Brooklyn Vegan!</p>
          <div id="brooklyn-vegan-logo-div"></div>
          {this.brooklynVeganEvents()}
        </div>
        <div id="the-skint-events-viewer" className="three">
          <p>Brought to you by The Skint!</p>
          <div id="skint-logo-div"></div>
          {this.skintEvents()}
        </div>
      </div>
    );
  }
}

ResultsPage.propTypes = propTypes;
