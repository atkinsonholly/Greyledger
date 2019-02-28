import React from 'react'
import { Link } from 'react-router-dom';

const GreyhoundShow = (props) => {
  const greyhound = props.selectedGreyhound
    return (
        <div className="greyhound">
          <div>
            <h2>Name: {greyhound.name}, {greyhound.sex}</h2>
            <p><span>{greyhound.status}</span></p>
            <h3>Sire: {greyhound.sire}</h3>
            <p>Birthdate: {greyhound.birthdate}</p>
            <p>Ear marks: {greyhound.left_ear} || {greyhound.right_ear}</p>
            <h3>Owners</h3>
            {greyhound.owners.sort(function (a, b) { return a.last_name.localeCompare(b.last_name) }).map(owner => `${owner.first_name} ${owner.last_name}`).join(', ')}
            <h3>Dates of vaccines</h3>
            <p>Distemper: {greyhound.distemper}</p>
            <p>Leptospira canicola: {greyhound.leptospira_canicola}</p>
            <p>Leptospira icterihaemorrhagiae: {greyhound.leptospira_icterihaemorrhagiae}</p>
            <p>Viral hepatitis: {greyhound.viral_hepatitis}</p>
            <p>Parvovirus: {greyhound.parvovirus}</p>
          </div>
          <Link to="/profile" className="link">Close</Link>
        </div>
    )
}

export default GreyhoundShow
