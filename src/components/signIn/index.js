import React, { Component } from 'react'
import FormField from '../home/promotion/FormField'
import { validate } from '../ui/misc'
import { firebase } from '../../firebase'

export default class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  }
  updateForm = element => {
    const newFormData = { ...this.state.formData }
    const newElement = { ...newFormData[element.id] }
    newElement.value = element.evt.target.value
    let valiDate = validate(newElement)
    newElement.valid = valiDate[0]
    newElement.validationMessage = valiDate[1]
    newFormData[element.id] = newElement
    this.setState({
      formData: newFormData,
      formError: false
    })
  }
  submitForm = evt => {
    evt.preventDefault()
    let dataToSubmit = {}
    let formIsValid = true

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
      formIsValid = this.state.formData[key].valid && formIsValid
    }
    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard')
        })
        .catch(this.setState({ formError: true }))
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    const { formData } = this.state
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={this.submitForm}>
            <h2>Please Login</h2>
            <FormField
              id="email"
              formData={formData.email}
              change={this.updateForm}
            />
            <FormField
              id="password"
              formData={formData.password}
              change={this.updateForm}
            />
            {this.state.formError ? (
              <div className="error_label">Something is wrong, try again</div>
            ) : null}
            <button>Log In</button>
          </form>
        </div>
      </div>
    )
  }
}
