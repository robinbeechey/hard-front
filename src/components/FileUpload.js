import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    UPDATE_AVATAR
} from '../constants/actionTypes';
import SuccessMessage from './SuccessMessage';
import Spinner from './Spinner';


const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onAvatarUpload: payload =>
        dispatch({type: UPDATE_AVATAR, payload}),
});

class FileUpload extends React.Component {

    constructor() {

        super();

        this.state = {
            file: '',
            imagePreviewUrl: '',
            fileSize: null,
            maxImageSizeBytes: 3045728,
            image: '',
            imageLoaded: false
        }
    }

    _handleImageChange(e) {
        e.preventDefault();

        var reader = new window.FileReader();
        var file = e.target.files[0];

        if (file) {
            let fileSize = file.size;
            this.setState({
                fileSize: fileSize
            });

            if (fileSize <= this.state.maxImageSizeBytes) {

                reader.onloadend = () => {
                    this.setState({
                        file: file,
                        imagePreviewUrl: reader.result
                    });
                };

                window.reader = reader;
                window.file = file;

                reader.readAsDataURL(file);
            }

        }

    }

    _handleInputTrigger(e) {
        e.preventDefault();
        this.inputElement.click();
    }

    _handleSubmit(e) {
        e.preventDefault();
        const { username } = this.props.currentUser;
        var file = this.state.file;
        if (file) {
            var formData = new FormData();
            formData.append("file", file);
            this.props.onAvatarUpload(agent.Auth.fileUpload(username, file.name, formData));
        }

    }


    render() {
        let profile = this.props.currentUser;
        let errorSize = null;

        let {imagePreviewUrl, fileSize, maxImageSizeBytes} = this.state;

        let $imagePreview = null;

        if (fileSize > maxImageSizeBytes) {
            errorSize = (
                <div className="size-alert col-xs-12">
                    <p>Sorry File size is bigger than 3 Mbs</p>
                </div>
            );
        }


        if (imagePreviewUrl) {
            $imagePreview = (
                <div>
                    <img alt="preview" className="image-preview" src={imagePreviewUrl}/>
                </div>

            )
        } else {
            $imagePreview = (
                <img alt="preview_avatar_url" className="preview-current" src={profile.avatar_url}/>
            )
        }


        return (
            <div className="row file-upload-container">
                <div className="col-xs-12">
                    <div className="preview-container">
                        {$imagePreview}
                        <input ref={input => this.inputElement = input} id="input-element" style={{display: "none"}}
                               onChange={(e)=>this._handleImageChange(e)} type="file"/>
                        <form className="btn-group btn-group-justified" role="group"
                              onSubmit={(e)=>this._handleSubmit(e)}>
                            <div className="btn-group button-board">
                                <button type="button" className="btn btn-primary upload"
                                        onClick={(e)=>this._handleInputTrigger(e)} type="button">
                                    <i className="ion-ios-upload-outline"></i>
                                </button>
                                <button type="submit" className="btn btn-primary">Upload</button>

                            </div>
                        </form>
                    </div>
                    <SuccessMessage message={this.props.successMessage}/>
                    <Spinner inProgress={this.props.inProgress}/>
                </div>
                {errorSize}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);