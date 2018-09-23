import React, { Component } from 'react'
import { firebase } from '../../firebase'
import Uploader from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class FileUploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: ''
  }
  handleUploadStart = () => {
    this.setState({
      isUploading: true
    })
  }
  handleUploadError = () => {
    this.setState({
      isUploading: false
    })
  }
  handleUploadSuccess = fileName => {
    console.log(fileName)
    this.setState({
      name: fileName,
      isUploading: false
    })
    firebase
      .storage()
      .ref(this.props.dir)
      .child(fileName)
      .getDownloadURL()
      .then(fileURL => {
        this.setState({
          fileURL
        })
        this.props.fileName(fileName)
      })
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.defaultImg) {
      return (state = {
        name: nextProps.defaultImgName,
        fileURL: nextProps.defaultImg
      })
    }
    return null
  }
  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileURL: ''
    })
    this.props.resetImage()
  }

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className="label_inputs">{this.props.tag}</div>
            <Uploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : (
          <div className="image_upload_container">
            <img
              style={{ width: '100%' }}
              src={this.state.fileURL}
              alt={this.state.name}
            />
            <div className="remove" onClick={this.uploadAgain}>
              Remove
            </div>
          </div>
        )}
        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: 'center', margin: '30px 0' }}
          >
            <CircularProgress style={{ color: '#98c6e9' }} thickness={7} />
          </div>
        ) : null}
      </div>
    )
  }
}
