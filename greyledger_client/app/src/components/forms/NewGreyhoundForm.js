import React from "react";

const NewGreyhoundForm = props => {
  return (
    <div>
      <h2>Greyhound Registration</h2>
      <form onSubmit={props.saveGreyhoundToDB}>
        <h3 className="greyhound_form_header">Greyhound Information</h3>
        <div>
          <label>
            Greyhound Racing Name:
            <input type="text" name="name" placeholder="Max. 16 characters" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Earmarks (left):
            <input type="text" name="left_ear" placeholder="Enter adult ear mark" onChange={props.handleChange}/>
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
            Sire:
            <input type="text" name="sire" placeholder="Enter sire" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          Sex:
          <select name="sex" onChange={props.handleChange}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label>
            Enter greyhound's date of birth:
            <input type="date" name="birthdate" onChange={props.handleChange}/>
          </label>
        </div>
        <h3 className="vaccine_header">Enter dates of latest vaccines</h3>
        <div>
          <label>
            Distemper:
            <input type="date" name="distemper" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Viral hepatitis:
            <input type="date" name="viral_hepatitis" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Leptospira canicola:
            <input type="date" name="leptospira_canicola" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Leptospira icterihaemorrhagiae:
            <input type="date" name="leptospira_icterihaemorrhagiae" onChange={props.handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Parvovirus:
            <input type="date" name="parvovirus" onChange={props.handleChange}/>
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
          <label>
            Accept Terms and Conditions:
            <input type="checkbox" name="isAccepted" checked={props.isAccepted} onChange={props.handleChange} />
          </label>
        </div>
        <input type="submit" value="Submit this greyhound" />
      </form>
    </div>
  )
}
export default NewGreyhoundForm
