import React from "react";

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
      owner_1: null,
      owner_2: null,
      owner_3: null,
      owner_4: null
    },
    isAccepted: null
  };

  setGreyHoundInformation = (event) => {
    event.preventDefault()
    if (this.state.isAccepted === false) {
      alert('You must accept the Terms and Conditions to register a greyhound')
    }

    this.props.registerNewGreyhound(this.state.greyhound)
    //find owners, if can't find then create new owners
    //add greyhound to user's greyhounds

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
          <h2>Greyhound Registration</h2>
          <form onSubmit={this.setGreyHoundInformation}>
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
                <input type="text" name="left_ear" placeholder="Enter adult ear mark" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Earmarks (right):
                <input type="text" name="right_ear" placeholder="Enter litter ear mark" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                Sire:
                <input type="text" name="sire" placeholder="Enter sire" onChange={this.handleChange}/>
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
                <input type="date" name="parvovirus" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <h3>Owner 1</h3>
              <div>
                <label> First Name
                  <input type="text" name="owner_1_first_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Last Name
                  <input type="text" name="owner_1_last_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Address
                  <input type="text" name="owner_1_address" onChange={this.handleChange}/>
                </label>
              </div>
              <h3>Owner 2</h3>
              <div>
                <label> First Name
                  <input type="text" name="owner_2_first_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Last Name
                  <input type="text" name="owner_2_last_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Address
                  <input type="text" name="owner_2_address" onChange={this.handleChange}/>
                </label>
              </div>
              <h3>Owner 3</h3>
              <div>
                <label> First Name
                  <input type="text" name="owner_3_first_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Last Name
                  <input type="text" name="owner_3_last_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Address
                  <input type="text" name="owner_3_address" onChange={this.handleChange}/>
                </label>
              </div>
              <h3>Owner 4</h3>
              <div>
                <label> First Name
                  <input type="text" name="owner_4_first_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Last Name
                  <input type="text" name="owner_4_last_name" onChange={this.handleChange}/>
                </label>
              </div>
              <div>
                <label> Address
                  <input type="text" name="owner_4_address" onChange={this.handleChange}/>
                </label>
              </div>
            </div>
            <div>
              <h3>Submit greyhound</h3>
              <label>
                Accept Terms and Conditions:
                <input type="checkbox" name="isAccepted" checked={this.state.isAccepted} onChange={this.handleChange} />
              </label>
            </div>
            <input type="submit" value="Submit this greyhound" />
          </form>
        </div>
      );
    }

}
export default SetGreyhoundInformation;
