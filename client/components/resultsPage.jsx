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
          <li>
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
          </li>
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
        <div id="brokelyn-events-viewer">
          <div className="test">
            <ul>
              {this.brokelynEvents()}
            </ul>
          </div>
          <div id="brokelyn-logo-div" />
        </div>
        <div id="village-voice-events-viewer">
          <div id="village-voice-logo-div" />
          <div className="test">
            <ul>
              {this.villageVoiceEvents()}
            </ul>
          </div>
        </div>
        <div id="brooklyn-vegan-events-viewer">
          <div id="brooklyn-vegan-logo-div" />
          <div>
            {this.brooklynVeganEvents()}
          </div>
        </div>
        <div id="the-skint-events-viewer">
          <div id="skint-logo-div" />
          <div>
            {this.skintEvents()}
          </div>
        </div>
      </div>
    );
  }
}

ResultsPage.propTypes = propTypes;
