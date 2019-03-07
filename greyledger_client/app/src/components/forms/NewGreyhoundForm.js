import React from "react";
import "../../styling/form.css"

const NewGreyhoundForm = props => {
  return (
    <div className="form-container">
      <h2>Greyhound Registration</h2>
        <form onSubmit={props.saveGreyhoundToDB}>
          <h3 className="greyhound_form_header">Greyhound Information</h3>
          <div className="row">
            <div className="col-1"><label>Greyhound Racing Name:</label></div>
            <div className="col-2"><input type="text" required name="name" placeholder="Max. 16 characters" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Earmarks (left):</label></div>
            <div className="col-2"><input required type="text" name="left_ear" placeholder="Enter adult ear mark" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Earmarks (right):</label></div>
            <div className="col-2"><input required type="text" name="right_ear" placeholder="Enter litter ear mark" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Sire:</label></div>
            <div className="col-2"><input required type="text" name="sire" placeholder="Enter sire" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Sex:</label></div>
            <div className="col-2"><select name="sex" onChange={props.handleChange}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Enter greyhound's date of birth:</label></div>
            <div className="col-2"><input required type="date" name="birthdate" onChange={props.handleChange}/></div>
          </div>
          <h3 className="vaccine_header">Enter dates of latest vaccines</h3>
          <div className="row">
            <div className="col-1"><label>Distemper:</label></div>
            <div className="col-2"><input required type="date" name="distemper" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Viral hepatitis:</label></div>
            <div className="col-2"><input required type="date" name="viral_hepatitis" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Leptospira canicola:</label></div>
            <div className="col-2"><input required type="date" name="leptospira_canicola" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Leptospira icterihaemorrhagiae:</label></div>
            <div className="col-2"><input required type="date" name="leptospira_icterihaemorrhagiae" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Parvovirus:</label></div>
            <div className="col-2"><input required type="date" name="parvovirus" onChange={props.handleChange}/></div>
          </div>

          <h3>Owner 1</h3>
          <div className="row">
            <div className="col-1"><label>First Name</label></div>
            <div className="col-2"><input required type="text" name="owner_1_first_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Last Name</label></div>
            <div className="col-2"><input required type="text" name="owner_1_last_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Address</label></div>
            <div className="col-2"><input required type="text" name="owner_1_address" onChange={props.handleChange}/></div>
          </div>
          <h3>Owner 2</h3>
          <div className="row">
            <div className="col-1"><label>First Name</label></div>
            <div className="col-2"><input type="text" name="owner_2_first_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Last Name</label></div>
            <div className="col-2"><input type="text" name="owner_2_last_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Address</label></div>
            <div className="col-2"><input type="text" name="owner_2_address" onChange={props.handleChange}/></div>
          </div>
          <h3>Owner 3</h3>
          <div className="row">
            <div className="col-1"><label>First Name</label></div>
            <div className="col-2"><input type="text" name="owner_3_first_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Last Name</label></div>
            <div className="col-2"><input type="text" name="owner_3_last_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Address</label></div>
            <div className="col-2"><input type="text" name="owner_3_address" onChange={props.handleChange}/></div>
          </div>
          <h3>Owner 4</h3>
          <div className="row">
            <div className="col-1"><label>First Name</label></div>
            <div className="col-2"><input type="text" name="owner_4_first_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Last Name</label></div>
            <div className="col-2"><input type="text" name="owner_4_last_name" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Address</label></div>
            <div className="col-2"><input type="text" name="owner_4_address" onChange={props.handleChange}/></div>
          </div>
          <div className="row accept">
            <div className="col-1"><label>Accept Terms and Conditions:</label></div>
            <div className="col-2"><input className="check-box" type="checkbox" name="isAccepted" checked={props.isAccepted} onChange={props.handleChange} /></div>
          </div>
        <div><input className="submit-button" type="submit" value="Submit this greyhound" /></div>
      </form>
    </div>
  )
}
export default NewGreyhoundForm
