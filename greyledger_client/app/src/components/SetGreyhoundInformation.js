import React from "react";

class SetGreyhoundInformation extends React.Component {

  state = {
    stackId: null,
    sex: "M",
    isAccepted: null
  };

  setGreyHoundInformation = (event) => {
    event.preventDefault()
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.NewGreyhound;

    const stackId = contract.methods["addGreyhound"].cacheSend({
      from: drizzleState.accounts[0]
    });

    console.log(stackId)
    // save the `stackId` for later reference
    this.setState({
      stackId

    });
  };

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      this.setState({
        [event.target.name]: event.target.checked
      })
    }
    else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  render() {
      return (
        <div>
          <h2>Greyhound Registration</h2>
          <form>
            <h3 className="greyhound_form_header">Greyhound Information</h3>
            <div>
              <label>
                Greyhound Racing Name:
                <input type="text" name="name" placeholder="Max. 16 characters" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Earmarks (left):
                <input type="text" name="name" placeholder="Enter adult ear mark" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Earmarks (right):
                <input type="text" name="name" placeholder="Enter litter ear mark" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              Sex:
              <select name="sex" onChange={this.handleChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label>
                Enter greyhound's date of birth:
                <input type="date" name="birthdate" onChange={this.handleChange}/>
              </label>
            </div>
            <h3 className="vaccine_header">Enter dates of latest vaccines</h3>
            <div>
              <label>
                Distemper:
                <input type="date" name="distemper" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Viral hepatitis:
                <input type="date" name="viral_hepatitis" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Leptospira canicola:
                <input type="date" name="leptospira_canicola" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Leptospira icterihaemorrhagiae:
                <input type="date" name="leptospira_icterihaemorrhagiae" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Parvovirus:
                <input type="date" name="parvovirus" />
              </label>
            </div>
            <div>
              <label>
                Accept Terms and Conditions:
                <input type="checkbox" name="isAccepted" checked={this.state.isAccepted} onChange={this.handleChange} />
              </label>
            </div>


          </form>
          <input type="submit" value="Submit this greyhound" onSubmit={this.setGreyHoundInformation}/>
        </div>
      );
    }

}
export default SetGreyhoundInformation;
