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
      <div className="event-info">
        <h3 className="event-title">{title}</h3>
        <p>{address}</p>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
      <div className="price-date-div">
        <div className="title-span"><p>Check Event</p></div>
        <div className="date-div">
          <div className="date-div-text">
            <p>{startDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BrooklynVeganEventItem.propTypes = propTypes;

export default BrooklynVeganEventItem;
