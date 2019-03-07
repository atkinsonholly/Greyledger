import React from "react";

const UpdateGreyhoundForm = props => {
  return (
    <div className="form-container">
      <h2>Change of Registered Ownership, or Change of Greyhound's Name</h2>
      <form onSubmit={props.sendUpdateToDB}>
        <h3 className="greyhound_form_header">Greyhound Information</h3>
        <div className="row">
          <div className="col-1"><label>Status:</label></div>
          <div className="col-2">
            <select name="status" onChange={props.handleChange}>
              <option name="nameChange" value="Greyhound has a new name">Greyhound has a new name</option>
              <option name="retired" value="Greyhound has retired">Greyhound has retired</option>
              <option name="changeOfOwnership" value="Notification of new ownership">Notification of new owners</option>
              <option name="euthanised" value="Greyhound has been euthanised">Greyhound has been euthanised</option>
              <option name="naturalDeath" value="Death by natural causes">Death by natural causes</option>
            </select>
          </div>
        </div>
        {props.status === "Greyhound has been euthanised" || props.status === "Death by natural causes" ?
        <div>
          <div className="row">
            <div className="col-1"><label>Enter date of death:</label></div>
            <div className="col-2"><input required type="date" name="date_of_death" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Enter vet information or other details of the death:</label></div>
            <div className="col-2"><input required type="text" name="details_of_death" onChange={props.handleChange}/></div>
          </div>
        </div>
        : null}

        {props.status === "Greyhound has a new name" ?
        <div>
          <div className="row">
            <div className="col-1"><label>Enter greyhound's previous name:</label></div>
            <div className="col-2"><input required type="text" name="previous_name" placeholder="Max. 16 characters" onChange={props.handleChange}/></div>
          </div>
          <div className="row">
            <div className="col-1"><label>Enter greyhound's new name:</label></div>
            <div className="col-2"><input required type="text" name="new_name" placeholder="Only include if the name has changed" onChange={props.handleChange}/></div>
          </div>
        </div>
        :
        <div className="row">
          <div className="col-1"><label>Enter greyhound's name:</label></div>
          <div className="col-2"><input required type="text" name="previous_name" placeholder="Max. 16 characters" onChange={props.handleChange}/></div>
        </div>
        }

        <div className="row">
          <div className="col-1"><label>Earmarks (right):</label></div>
          <div className="col-2"><input required type="text" name="right_ear" placeholder="Enter litter ear mark" onChange={props.handleChange}/></div>
        </div>
        <div className="row">
          <div className="col-1"><label>Earmarks (left):</label></div>
          <div className="col-2"><input required type="text" name="left_ear" placeholder="Enter adult ear mark" onChange={props.handleChange}/></div>
        </div>

          <h3>Please enter the names and addresses of all owners below</h3>
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
            <div><input className="submit-button" type="submit" value="Update this greyhound" /></div>
        </form>
    </div>
  )
}
export default UpdateGreyhoundForm
