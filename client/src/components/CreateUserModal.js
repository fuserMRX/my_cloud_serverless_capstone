import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Local Import
import CreateUserForm from './CreateUserForm';

class CreateUserModal extends Component {

    handleCloseClick = (e) => {
        this.props.onHide(e, false);
    };

    render() {
        const createUser = 'Create a new nickname you want to use during your session';
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {createUser}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateUserForm auth={this.props.auth}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.handleCloseClick}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default CreateUserModal;
