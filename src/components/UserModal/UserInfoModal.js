import React, { useState } from 'react';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import { Row, Col } from 'react-bootstrap';

export default function UserInfoModal(props) {
    const {
        show,
        handleClose,
        modalTitle,
        user,
        onSubmit
    } = props;

    return (<Modal
        show={show}
        handleClose={handleClose}
        onSubmit={onSubmit}
        modalTitle={modalTitle}
    >
        <Row>
            <Col>
                <h6>Name</h6>
            </Col>
            <Col>
                {user.name}
            </Col>
        </Row>
        <Row>
            <Col>
                <h6>Email</h6>
            </Col>
            <Col>
                {user.email}
            </Col>
        </Row>
        <Row>
            <Col>
                <h6>Profile Picture</h6>
            </Col>
            <Col>
                <img className="container-profile-picture"
                    style={{ height: "150px", width: "150px", margin: "10px", objectFit: "cover" }}
                    src={user.profilePicture ? user.profilePicture : `https://res.cloudinary.com/dmtopd6ps/image/upload/v1632883166/non-avatar_yg1nky.png`}
                    alt="no profile picture" />
            </Col>
        </Row>
        <Row>
            <Col>
                <h6>Role</h6>
            </Col>
            <Col>
                {user.role}
            </Col>
        </Row>
    </Modal>
    )
}
