import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import FormField from './FormField';
import { validate } from '../../ui/misc';


export default class Enroll extends Component {
  state = {
    formError:false,
    formSuccess: '',
    formData: {
      email: {
        element:'input',
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

      }
    }
  }
  updateForm(element){
    const  newFormData = {...this.state.formData}
    const newElement = {...newFormData[element.id]}
    newElement.value = element.event.target.value
    let valiDate = validate(newElement)
    newElement.valid = valiDate[0]
    newElement.validationMessage = valiDate[1]
    newFormData[element.id] = newElement
    this.setState({
      formData: newFormData,
      formError: false
    })
  }
  resetFormSuccess = () => {
    const newFormData = {...this.state.formData}
    for(let key  in newFormData){
      newFormData[key].value = "";
      newFormData[key].valid = false
      newFormData[key].validationMessage = false
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: 'Congratulation'
    })
    this.successMessage()
  }
  submitForm = (evt) => {
    evt.preventDefault()
    let dataToSubmit = {}
    let formIsValid = true

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
      formIsValid = this.state.formData[key].valid && formIsValid
    }
    if(formIsValid) {
      this.resetFormSuccess()
    } 
    else {
      this.setState({
        formError: true
      })
    }

  }
  successMessage = () => {
    setTimeout(() =>  this.setState({
       formSuccess: ''
    })
    , 20000)
  }
  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
        <form onSubmit={() => this.submitForm(e)}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
          <FormField id="email" formData={this.state.formData.email} change={element => this.updateForm(element)}/>
          {this.state.formError && <div className="error_label">Something is wrong </div>}
          <div className="success_label">{this.state.}</div>
          <button onClick={this.submitForm}>Enroll</button>
          </div>
        </form>
        </div>
      </Fade>
    )
  }
}
