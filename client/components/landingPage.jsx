import React from 'react';

const propTypes = {
  handleSubmit: React.PropTypes.func,
};

const LandingPage = ({ handleSubmit }) => {
  return (
    <div id="landing-page-component">
      <div id="hero-text" className="four">
        <h3>There are a hundred things to do in NYC on any given day...</h3><br />
        <h3>Here's the proof.</h3>
      </div>
      <div id="form-div" className="six">
        <form onSubmit={handleSubmit}>
          <input type="submit" value="show me what's going on today!" />
        </form>
      </div>
    </div>
  );
}

LandingPage.propTypes = propTypes;

export default LandingPage;
