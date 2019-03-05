import React from "react";
import NewGreyhoundForm from './forms/NewGreyhoundForm'

class SetGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    greyhound: {
      name: null,
      left_ear: null,
      right_ear: null,
      sex: "M",
      sire: null,
      birthdate: null,
      distemper: null,
      leptospira_canicola: null,
      leptospira_icterihaemorrhagiae: null,
      viral_hepatitis: null,
      parvovirus: null,
      status: "Initial registration"
    },
    owners: {
    },
    isAccepted: null
  };

  saveGreyhoundToDB = async (event) => {
    event.preventDefault()
    if (this.state.isAccepted === false || this.state.isAccepted === null) {
      alert('You must accept the Terms and Conditions to register a greyhound')
      return
    }
    //register this form to DB
    const response = await this.props.registerNewGreyhound(this.state.greyhound, this.state.owners, this.props.currentUser.id)
    // error handling
    console.log(response)
    if (response && response.exception) return false
    if (response === undefined) return false
    if (response === false) return false
    if (!response.exception) {
      //only proceed to blockchain if greyhound, owners and users can be registered
      this.saveGreyhoundToBlockchain(response)
    }
    return true
  }

  saveGreyhoundToBlockchain = (response) => {
    const name = response.name;
    const ear_marks = response.left_ear + ", " + response.right_ear;
    const sexSireBirthdate = response.sex + ", " + response.sire + ", " + response.birthdate;
    const status = response.status;
    const owners = response.owners.map(owner => owner.first_name + " " + owner.last_name + ", " + owner.address).join(", ")
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;

    const stackId = contract.methods["createUniqueGreyhound"].cacheSend(
      name,
      ear_marks,
      sexSireBirthdate,
      status,
      owners,
      [],
      {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({
      stackId
    });
  };

  handleChange = (event) => {
    event.persist()
    if (event.target.type === "checkbox") {
      this.setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked
      })
    )}
    else if (event.target.name.includes('owner')){
      this.setState((prevState) => ({
        owners: {
          ...prevState.owners,
          [event.target.name]: event.target.value
        }
      })
    )}
    else {
      this.setState((prevState) => ({
        greyhound: {
          ...prevState.greyhound,
          [event.target.name]: event.target.value
        }
      })
    )}
  }

  render() {
    return (
      <div className="register-container">
        <div className="error">
          {this.props.error !== null? <div><p>{this.props.error}</p></div> : null}
        </div>
        <NewGreyhoundForm
          saveGreyhoundToDB={this.saveGreyhoundToDB}
          handleChange={this.handleChange}
          isAccepted={this.state.isAccepted}
          />
      </div>
    );
  }
}
export default SetGreyhoundInformation;
