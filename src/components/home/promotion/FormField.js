import React from 'react'

const FormField = ({formData, id, change}) => {
  const showError = () => {
    let errorMessage = <div className="error_label">
      {
        formData.validation && !formData.valid ? formDate.validateMessage : null
      }
    </div>
  }
  const renderTemplate = () => {
    let formTemplate = null
    switch(formData.element) {
      case('input'):
      <div><input {...formData.config} value={formData.value} onChange={evt => change(evt, id)}/>{showError()}</div>

      break;
      default:
      formTemplate = null
    }
    return formTemplate
  }
  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormField
