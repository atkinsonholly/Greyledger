import React from "react";
import UpdateGreyhoundForm from './forms/UpdateGreyhoundForm'

class UpdateGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    greyhound: {
      new_name: "",
      previous_name: null,
      right_ear: null,
      left_ear: null,
      status: "Greyhound has a new name",
      date_of_death: "01/01/0001",
      details_of_death: ""
    },
    owners: {
    },
    isAccepted: null
  };

  sendUpdateToDB = async (event) => {
    event.preventDefault()
    if (this.state.isAccepted === false || this.state.isAccepted === null) {
      alert('You must accept the Terms and Conditions to register a greyhound')
      return
    }
    //register this form to DB
    const response = await this.props.updateGreyhound(this.state.greyhound, this.state.owners, this.props.currentUser.id)
    // error handling
    if (response && response.exception) return false
    if (response === undefined) return false
    if (response === false) return false
    if (!response.exception) {
      //only proceed to blockchain if greyhound can be updated
      console.log(response)
      this.sendUpdateToBlockchain(this.state.greyhound.previous_name, response)
    }
    return true
  }

  sendUpdateToBlockchain = (prev_name, response) => {
    const new_name = response.name;
    const ear_marks = response.left_ear + ", " + response.right_ear;
    let status = response.status;
    if (status === "Greyhound has been euthanised" || status === "Death by natural causes") {
      let status = response.status + ", " + response.date_of_death
    }
    const owners = response.owners.map(owner => owner.first_name + " " + owner.last_name + ", " + owner.address).join(", ")
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;

    const stackId = contract.methods["updateGreyhound"].cacheSend(
      prev_name,
      new_name,
      ear_marks,
      status,
      owners,
      {
      from: drizzleState.accounts[0]
    });

    console.log(stackId)
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
      <div>
        <div className="error">
          {this.props.error !== null? <div><p>{this.props.error}</p></div> : null}
        </div>
        <UpdateGreyhoundForm
          sendUpdateToDB={this.sendUpdateToDB}
          handleChange={this.handleChange}
          isAccepted={this.state.isAccepted}
          status={this.state.greyhound.status}
          />
      </div>
    );
  }
}
export default UpdateGreyhoundInformation;
