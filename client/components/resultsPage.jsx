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
  constructor() {
    super();
    this.state = {
      brokelynToggled: 'hidden',
      villageVoiceToggled: 'hidden',
      brooklynVeganToggled: 'hidden',
      theSkintToggled: 'hidden',
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  toggleHidden(e) {
    const targetBlog = e.target.className;
    if (targetBlog === 'brokelyn') {
      return (this.state.brokelynToggled === 'hidden') ? this.setState({ brokelynToggled: 'show' }) : this.setState({ brokelynToggled: 'hidden' });
    } else if (targetBlog === 'villageVoice') {
      return (this.state.villageVoiceToggled === 'hidden') ? this.setState({ villageVoiceToggled: 'show' }) : this.setState({ villageVoiceToggled: 'hidden' });
    } else if (targetBlog === 'brooklynVegan') {
      return (this.state.brooklynVeganToggled === 'hidden') ? this.setState({ brooklynVeganToggled: 'show' }) : this.setState({ brooklynVeganToggled: 'hidden' });
    } else if (targetBlog === 'theSkint') {
      return (this.state.theSkintToggled === 'hidden') ? this.setState({ theSkintToggled: 'show' }) : this.setState({ theSkintToggled: 'hidden' });
    }
  }
  brokelynEvents() {
    return this.props.brokelynEvents.map((event) => {
      return (
        <div className="event-item-odd" >
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
        <div className="event-item-odd" >
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
        <div id="brokelyn-events-viewer" onClick={this.toggleHidden}>
          <div id="brokelyn-logo-div" className="brokelyn" />
          <div id="brokelyn-events-list" className={this.state.brokelynToggled}>
            {this.brokelynEvents()}
          </div>
        </div>
        <div id="village-voice-events-viewer" onClick={this.toggleHidden}>
          <div id="village-voice-logo-div" className="villageVoice" />
          <div className={this.state.villageVoiceToggled}>
            {this.villageVoiceEvents()}
          </div>
        </div>
        <div id="brooklyn-vegan-events-viewer" onClick={this.toggleHidden}>
          <div id="brooklyn-vegan-logo-div" className="brooklynVegan" />
          <div className={this.state.brooklynVeganToggled}>
            {this.brooklynVeganEvents()}
          </div>
        </div>
        <div id="the-skint-events-viewer" onClick={this.toggleHidden}>
          <div id="skint-logo-div" className="theSkint" />
          <div className={this.state.theSkintToggled}>
            {this.skintEvents()}
          </div>
        </div>
      </div>
    );
  }
}

ResultsPage.propTypes = propTypes;
