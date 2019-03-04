import React from 'react'
import { Link } from 'react-router-dom';
import '../styling/GreyhoundShow.css';

class GreyhoundShow extends React.PureComponent {

  state = {
    users: []
  }

  readGreyhoundUsers = async(greyhound_name) => {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;
    const array = await contract.methods.getUsers(greyhound_name).call();
    return array;
  }

  componentDidMount() {
    this.readGreyhoundUsers(this.props.selectedGreyhound.name)
    .then(resp => this.setState({users: resp}));
  }

  render(){
    return (
        <div className="greyhound-show">
          <div className="greyhound-container">
            <div className="greyhound-flex-container">
              <div className="greyhound-overview">
                <h2 className={this.props.selectedGreyhound.sex === 'F'? 'greyhound-female' : 'greyhound-male'}>{this.props.selectedGreyhound.name}, {this.props.selectedGreyhound.sex}</h2>
                <p><span>Last update: {this.props.selectedGreyhound.status}</span></p>
                <h3>Linked accounts: </h3>
                {this.state.users.map(acct => <p key={acct}>{acct}</p>)}
                <h3>Sire: {this.props.selectedGreyhound.sire}</h3>
                <p>Birthdate: {this.props.selectedGreyhound.birthdate}</p>
                <p>Ear marks: {this.props.selectedGreyhound.left_ear} || {this.props.selectedGreyhound.right_ear}</p>
                <h3>Owners</h3>
                <p>{this.props.selectedGreyhound.owners.sort(function (a, b) { return a.last_name.localeCompare(b.last_name) }).map(owner => `${owner.first_name} ${owner.last_name}`).join(', ')}</p>
                <h3>Dates of vaccines</h3>
                <p>Distemper: {this.props.selectedGreyhound.distemper}</p>
                <p>Leptospira canicola: {this.props.selectedGreyhound.leptospira_canicola}</p>
                <p>Leptospira icterihaemorrhagiae: {this.props.selectedGreyhound.leptospira_icterihaemorrhagiae}</p>
                <p>Viral hepatitis: {this.props.selectedGreyhound.viral_hepatitis}</p>
                <p>Parvovirus: {this.props.selectedGreyhound.parvovirus}</p>
              </div>
              <div className="greyhound-portrait">

              </div>
            </div>
          </div>
          <Link to="/profile" className="link greyhound-show-link">Close</Link>
        </div>
    )
  }
}

export default GreyhoundShow
