import React from 'react'
import { Link } from 'react-router-dom';
import '../styling/GreyhoundShow.css';

const GreyhoundShow = (props) => {
  const greyhound = props.selectedGreyhound
    return (
        <div className="greyhound-show">
          <div className="greyhound-container">
            <div className="greyhound-flex-container">
              <div className="greyhound-overview">
                <h2 className={greyhound.sex === 'F'? 'greyhound-female' : 'greyhound-male'}>{greyhound.name}, {greyhound.sex}</h2>
                <p><span>{greyhound.status}</span></p>
                <h3>Sire: {greyhound.sire}</h3>
                <p>Birthdate: {greyhound.birthdate}</p>
                <p>Ear marks: {greyhound.left_ear} || {greyhound.right_ear}</p>
                <h3>Owners</h3>
                <p>{greyhound.owners.sort(function (a, b) { return a.last_name.localeCompare(b.last_name) }).map(owner => `${owner.first_name} ${owner.last_name}`).join(', ')}</p>
                <h3>Dates of vaccines</h3>
                <p>Distemper: {greyhound.distemper}</p>
                <p>Leptospira canicola: {greyhound.leptospira_canicola}</p>
                <p>Leptospira icterihaemorrhagiae: {greyhound.leptospira_icterihaemorrhagiae}</p>
                <p>Viral hepatitis: {greyhound.viral_hepatitis}</p>
                <p>Parvovirus: {greyhound.parvovirus}</p>
              </div>
              <div className="greyhound-portrait">
                <img src={require("../images/greyhound_portrait.jpg")} alt="logo"/>
              </div>
            </div>
          </div>
          <Link to="/profile" className="link greyhound-show-link">Close</Link>
        </div>
    )
}

export default GreyhoundShow
