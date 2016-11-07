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

const SkintEventItem = ({
  source,
  cost,
  startDate,
  title,
  eventURL,
  imgSrc,
  address,
  description,
  }) => {
  const divStyle = {
    background: `url('${imgSrc}')`,
  };
  return (
    <div>
      <div className="img-div" style={divStyle} />
      <p>{startDate}</p>
      <p>{description}</p>
    </div>
  );
};

SkintEventItem.propTypes = propTypes;

export default SkintEventItem;


