import React from 'react'
import { Link } from 'react-router-dom';

const GreyhoundLink = (props) => {
  const { greyhound } = props;
    return (
        <div className="greyhound-list">
          <Link to={"/greyhounds/" + greyhound.id} className="link">
            {greyhound.name}
          </Link>
        </div>
    )
}

export default GreyhoundLink
