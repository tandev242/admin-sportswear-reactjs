import React, { useState } from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

export default function EditUserModal(props) {
    const {
        show,
        handleClose,
        modalTitle,
        user,
        setUser,
        onSubmit
    } = props;

    const initOptions = () => {
        if (user.role === 'admin') {
            return [{ name: "user", value: "user" }]
        }
        return [{ name: "admin", value: "admin" }]
    }


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
                <Input placeholder="enter the name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </Col>
        </Row>
        <Row>
            <Col>
                <h6>Email</h6>
            </Col>
            <Col>
                <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
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
                <Input type={"select"}
                    value={user.role}
                    placeholder={user.role}
                    options={initOptions()}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                />
            </Col>
        </Row>
    </Modal>
    )
}
