import React, { Component } from 'react'
import AdminLayout from '../../../hoc/Admin_layout'
import { validate } from '../../ui/misc'
import FormField from '../../home/promotion/FormField'
import FileUploader from '../../ui/fileUploader'
import { firebasePlayers, firebaseDB, firebase } from '../../../firebase'

export default class AddEditPlayers extends Component {
  state = {
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'date_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastName: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last name',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player number',
          name: 'number_input',
          type: 'number',
          max: 44,
          min: 1
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Select e position',
          name: 'select_position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: true
      }
    }
  }

  componentDidMount = () => {
    const {
      computedMatch: {
        params: { id: playerId }
      }
    } = this.props

    if (!playerId) {
      this.setState({
        formType: 'Add player'
      })
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val()
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, 'Edit player', url)
            })
            .catch(e => {
              this.updateFields(
                { ...playerData, image: '' },
                playerId,
                'Edit player'
              )
            })
        })
    }
  }
  updateFields = (player, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData }
    for (let key in newFormData) {
      newFormData[key].value = player[key]
      newFormData[key].valid = true
    }
    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData
    })
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    })
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      })
    }, 2000)
  }

  submitForm = evt => {
    evt.preventDefault()
    let dataToSubmit = {}
    let formIsValid = true
    console.log(this.props)
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
      formIsValid = this.state.formData[key].valid && formIsValid
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit player') {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Update correctly')
          })
          .catch(e => {
            this.setState({
              formError: true
            })
          })
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players')
          })
          .catch(e => {
            this.setState({
              formError: true
            })
          })
      }
    } else {
      this.setState({
        formError: true
      })
    }
  }

  updateForm = (element, content = '') => {
    const newFormData = { ...this.state.formData }
    const newElement = { ...newFormData[element.id] }

    if (content === '') {
      newElement.value = element.evt.target.value
    } else {
      newElement.value = content
    }

    let valiDate = validate(newElement)
    newElement.valid = valiDate[0]
    newElement.validationMessage = valiDate[1]
    newFormData[element.id] = newElement
    this.setState({
      formData: newFormData,
      formError: false
    })
  }
  resetImage = () => {
    const newFormData = { ...this.state.formData }
    newFormData['image'].value = ''
    newFormData['image'].valid = false
    this.setState({
      defaultImg: '',
      formData: newFormData
    })
  }

  fileName = fileName => {
    this.updateForm(
      {
        id: 'image'
      },
      fileName
    )
  }

  render() {
    console.log(this.state.formData)

    const { formType } = this.state
    return (
      <AdminLayout>
        {console.log(this.state)}
        <div className="editplayers_dialog_wrapper">
          <h2>{formType}</h2>
          <div>
            <form onSubmit={this.submitForm}>
              <FileUploader
                dir="players"
                tag="Player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={this.resetImage}
                fileName={this.fileName}
              />
              <FormField
                id="name"
                formData={this.state.formData.name}
                change={this.updateForm}
              />
              <FormField
                id="lastName"
                formData={this.state.formData.lastName}
                change={this.updateForm}
              />
              <FormField
                id="number"
                formData={this.state.formData.number}
                change={this.updateForm}
              />
              <FormField
                id="position"
                formData={this.state.formData.position}
                change={this.updateForm}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : (
                ''
              )}
              <div className="admin_submit">
                <button onClick={this.submitForm}>{formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    )
  }
}
