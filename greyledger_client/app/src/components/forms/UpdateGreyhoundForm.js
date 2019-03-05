import React from "react";

const UpdateGreyhoundForm = props => {
  return (
    <div>
    <h2>Change of Registered Ownership, or Change of Greyhound's name</h2>
    <form onSubmit={props.sendUpdateToDB}>
      <h3 className="greyhound_form_header">Greyhound Information</h3>
      <div>
        Status:
        <select name="status" onChange={props.handleChange}>
          <option name="nameChange" value="Greyhound has a new name">Greyhound has a new name</option>
          <option name="retired" value="Greyhound has retired">Greyhound has retired</option>
          <option name="changeOfOwnership" value="Notification of new ownership">Notification of new owners</option>
          <option name="euthanised" value="Greyhound has been euthanised">Greyhound has been euthanised</option>
          <option name="naturalDeath" value="Death by natural causes">Death by natural causes</option>
        </select>
      </div>
      {props.status === "Greyhound has been euthanised" || props.status === "Death by natural causes" ?
      <div>
        <div>
          <label>
            Enter date of death:
            <input type="date" name="date_of_death" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Enter vet information or other details of the death:
            <input type="text" name="details_of_death" onChange={props.handleChange}/>
          </label>
        </div>
      </div>
      : null}

      {props.status === "Greyhound has a new name" ?
      <div>
        <div>
          <label>
            Enter greyhound's previous name (MANDATORY):
            <input type="text" name="previous_name" placeholder="Max. 16 characters" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Enter greyhound's new name:
            <input type="text" name="new_name" placeholder="Only include if the name has changed" onChange={props.handleChange}/>
          </label>
        </div>
      </div>
      :
      <div>
        <label>
          Enter greyhound's name:
          <input type="text" name="previous_name" placeholder="Max. 16 characters" onChange={props.handleChange}/>
        </label>
      </div>
      }

      <div>
        <label>
          Earmarks (right):
          <input type="text" name="right_ear" placeholder="Enter litter ear mark" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Earmarks (left):
          <input type="text" name="left_ear" placeholder="Enter adult ear mark" onChange={props.handleChange}/>
        </label>
      </div>

      <div>
        <h3>Please enter the names and addresses of all current owners below</h3>
        <h3>Owner 1</h3>
        <div>
          <label> First Name
            <input type="text" name="owner_1_first_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Last Name
            <input type="text" name="owner_1_last_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Address
            <input type="text" name="owner_1_address" onChange={props.handleChange}/>
          </label>
        </div>
        <h3>Owner 2</h3>
        <div>
          <label> First Name
            <input type="text" name="owner_2_first_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Last Name
            <input type="text" name="owner_2_last_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Address
            <input type="text" name="owner_2_address" onChange={props.handleChange}/>
          </label>
        </div>
        <h3>Owner 3</h3>
        <div>
          <label> First Name
            <input type="text" name="owner_3_first_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Last Name
            <input type="text" name="owner_3_last_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Address
            <input type="text" name="owner_3_address" onChange={props.handleChange}/>
          </label>
        </div>
        <h3>Owner 4</h3>
        <div>
          <label> First Name
            <input type="text" name="owner_4_first_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Last Name
            <input type="text" name="owner_4_last_name" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label> Address
            <input type="text" name="owner_4_address" onChange={props.handleChange}/>
          </label>
        </div>
      </div>
      <div>
        <label>
          Accept Terms and Conditions:
          <input type="checkbox" name="isAccepted" checked={props.isAccepted} onChange={props.handleChange} />
        </label>
      </div>
      <input className="submit-button" type="submit" value="Update this greyhound" />
    </form>
    </div>
  )
}
export default UpdateGreyhoundForm
