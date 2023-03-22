import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUploadUrl, uploadFile } from '../utils/api';

const UploadState = {
    NOUPLOAD: 'NOUPLOAD',
    FetchingPresignedUrl: 'FetchingPresignedUrl',
    UploadingFile: 'UploadingFile',
};

export class EditUserAvatar extends Component {
    state = {
        file: undefined,
        uploadState: UploadState.NOUPLOAD,
        toHome: false,
        invalidData: false,
    }

    componentDidMount() {
        if (!this.props.authedUser) {
            this.setState(() => ({
                invalidData: true,
            }));
        }
    }

    handleFileChange = (event) => {
        const files = event.target.files;
        if (!files) return;

        this.setState({
            file: files[0]
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.setUploadState(UploadState.FetchingPresignedUrl);
            const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.userEmail);

            this.setUploadState(UploadState.UploadingFile);
            await uploadFile(uploadUrl, this.state.file);

            console.log('File was uploaded!');
        } catch (e) {
            if (e instanceof Error) {
                console.log('Could not upload a file: ' + e.message);
            } else {
                console.log('Unexpected error: =>' + e);
            }
        } finally {
            this.setUploadState(UploadState.NoUpload);
            this.setState({
                toHome: true,
            });
        }
    }

    setUploadState(uploadState) {
        this.setState({
            uploadState,
        });
    }

    render() {
        if (this.state.toHome || this.state.invalidData) {
            return <Redirect to='' />;
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.File
                        id="exampleFormControlFile1"
                        label="Upload a new avatar"
                        required
                        name="file"
                        onChange={this.handleFileChange}
                    />
                </Form.Group>
                {this.renderButton()}
            </Form>
        );
    }

    renderButton() {

        return (
            <div>
                {this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}
                {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
                <Button
                    variant="outline-success"
                    type="submit"
                    disabled={this.state.uploadState !== UploadState.NOUPLOAD}
                >
                    {(this.state.uploadState === UploadState.NOUPLOAD) ? 'Upload' :
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    };
};

export default connect(mapStateToProps)(EditUserAvatar);
