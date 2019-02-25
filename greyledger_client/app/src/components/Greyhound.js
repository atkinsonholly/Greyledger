import React from 'react'

const Greyhound = (props) => {
  const { greyhound } = props;
    return (
        <div className="greyhound">
        {greyhound.name}
        </div>
    )
}

export default Greyhound
