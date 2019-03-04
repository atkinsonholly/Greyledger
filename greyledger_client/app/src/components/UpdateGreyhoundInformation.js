import React from "react";
import UpdateGreyhoundForm from './forms/UpdateGreyhoundForm'

class UpdateGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    greyhound: {
      new_name: null,
      previous_name: null,
      right_ear: null,
      left_ear: null,
      status: "Greyhound has a new name - no change of ownership"
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
    if (!response.exception) {

      //only proceed to blockchain if greyhound can be updated
      this.sendUpdateToBlockchain(response)
    }
    return true
  }

  sendUpdateToBlockchain = (response) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.greyhoundFactory;

    // const stackId = contract.methods["addGreyhound"].cacheSend({
    //   from: drizzleState.accounts[0]
    // });
    //
    // console.log(stackId)
    // // save the `stackId` for later reference
    // this.setState({
    //   stackId
    // });
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
          />
      </div>
    );
  }
}
export default UpdateGreyhoundInformation;
