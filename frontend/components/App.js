// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import axios from 'axios'
import React, { useState } from 'react'

const e = { // This is a dictionary of validation error messages.
  // username
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.


export default function App() {
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, (2) the validation errors,
  // (3) whether submit is disabled, (4) the success message from the server,
  // and (5) the failure message from the server.
  const [formData, setFormData] = useState({
    username:'',
    favLanguage:'',
    favFood: '',
    agreement: false
  })
  const [messageData, setMessageData] = useState(e)
  const [formDisabled, setFormDisabled] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.

  
  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
    const { name, value, type, checked } = evt.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.
    evt.preventDefault()
    setFormDisabled(false);
    axios.post('https://webapis.bloomtechdev.com/registration', formData)
    .then((res) => {
      console.log('response', res.data);
      setFormData({
        username:'',
        favLanguage:'',
        favFood: '',
        agreement: false
      });
      setSuccessMessage(res.data.message)
    })
    .catch((err) => {
      console.error(err);
      console.log(formData)
      setErrorMessage(res.data.message); 
    });
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit}>
        <h4 className="success">{successMessage}</h4>
        <h4 className="error">{errorMessage}</h4>

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" onChange={onChange} value={formData.username} placeholder="Type Username" />
          <div className="validation">{messageData.usernameRequired}</div>
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input type="radio" name="favLanguage" value="javascript" onChange={onChange} checked={formData.favLanguage === 'javascript'} />
              JavaScript
            </label>
            <label>
              <input type="radio" name="favLanguage" value="rust" onChange={onChange} checked={formData.favLanguage === 'rust'} />
              Rust
            </label>
          </fieldset>
          <div className="validation">{messageData.favLanguageRequired}</div>
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select value={formData.favFood} onChange={onChange} id="favFood" name="favFood">
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          <div className="validation">{messageData.favFoodRequired}</div>
        </div>

        <div className="inputGroup">
          <label>
            <input id="agreement" type="checkbox" name="agreement" onChange={onChange} checked={formData.agreement} />
            Agree to our terms
          </label>
          <div className="validation">{messageData.agreementRequired}</div>
        </div>

        <div>
          <input type="submit" disabled={formDisabled} />
        </div>
      </form>
    </div>
  )
}
