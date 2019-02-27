import React from "react";
import UpdateGreyhoundForm from './forms/UpdateGreyhoundForm'

class UpdateGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    greyhound: {
      name: null,
      right_ear: null,
      left_ear: null,
      status: null
    },
    owners: {
      owner_1: null,
      owner_2: null,
      owner_3: null,
      owner_4: null
    },
    isAccepted: null
  };

  sendUpdateToDB = async (event) => {
    event.preventDefault()
    if (this.state.isAccepted === false || this.state.isAccepted === null) {
      alert('You must accept the Terms and Conditions to update this record')
      return
    }
    //check Ruby validation all working correctly
    //register this greyhound
    const response = await this.props.updateGreyhound(this.state.greyhound)
    if (response && response.exception) return
    if (response === undefined) return

    //find owners, if can't find then create new owners
    //add greyhound to user's greyhounds

    //do not proceed to blockchain if greyhound, owners or users cannot be registered
    else if (!response.exception) {
      this.sendUpdateToBlockchain()
    }
    this.props.turnOnSubmitted()
  }

  sendUpdateToBlockchain = () => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.NewGreyhound;

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
