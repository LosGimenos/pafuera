import React from 'react';

const propTypes = {
  source: React.PropTypes.string,
  cost: React.PropTypes.string,
  startDate: React.PropTypes.string,
  title: React.PropTypes.string,
  eventURL: React.PropTypes.string,
  imgSrc: React.PropTypes.string,
  address: React.PropTypes.string,
  description: React.PropTypes.string,
};

const BrooklynVeganEventItem = ({ source,
                             cost,
                             startDate,
                             title,
                             eventURL,
                             imgSrc,
                             address,
                             description
                           }) => {
  const divStyle = {
    background: `url('${imgSrc}')`,
  };
  return (
    <div>
      <div className="img-div" style={divStyle} />
      <h3 className="event-title">{title}</h3>
      <div className="title-span hidden"><p>{cost}</p></div>
      <p>{startDate}</p>
      <p>{address}</p>
      <p>{description}</p>
    </div>
  );
};

BrooklynVeganEventItem.propTypes = propTypes;

export default BrooklynVeganEventItem;
