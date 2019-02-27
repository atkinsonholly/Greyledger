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
          <option value="nameChange">Greyhound has a new name - no change of ownership</option>
          <option value="retired">Greyhound has retired - no change of ownership</option>
          <option value="changeOfOwnership">Greyhound still racing - notification of new ownership / name</option>
          <option value="changeOfOwnershipRetired">Greyhound retired - notification of new ownership / name</option>
          <option value="euthanised">Greyhound euthanised</option>
          <option value="naturalDeath">Greyhound death from natural causes</option>
        </select>
      </div>
      <div>
        <label>
          Enter greyhound's new name (if changed):
          <input type="text" name="new_name" placeholder="Only include if the name has changed" onChange={props.handleChange}/>
        </label>
      </div>
      <div>
        <label>
          Enter greyhound's (previous) name:
          <input type="text" name="previous_name" placeholder="Max. 16 characters" onChange={props.handleChange}/>
        </label>
      </div>
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
        <h3>Update greyhound details</h3>
        <label>
          Accept Terms and Conditions:
          <input type="checkbox" name="isAccepted" checked={props.isAccepted} onChange={props.handleChange} />
        </label>
      </div>
      <input type="submit" value="Update this greyhound" />
    </form>
    </div>
  )
}
export default UpdateGreyhoundForm
