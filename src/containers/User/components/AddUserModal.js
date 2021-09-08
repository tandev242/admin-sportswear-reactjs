import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import {Row, Col} from 'react-bootstrap';


export default function AddUserModal(props){
    const {
        show,
        handleClose,
        modalTitle,
        onSubmit
    } = props;

    // console.log({expandedArray, checkedArray})

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
        </Modal>
    );
}
