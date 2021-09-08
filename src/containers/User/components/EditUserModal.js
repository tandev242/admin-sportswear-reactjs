import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';
import { API_URL } from "../../../actions/constants";

export default function EditUserModal(props) {
    const {
        show,
        handleClose,
        modalTitle,
        user,
        setUser,
        onSubmit
    } = props;

    if (user) {

        const handleOptions = () => {
            if (user.role === 'admin') {
                return [{ name: "user", value: "user" }]
            }
            return [{ name: "admin", value: "admin" }]
        }

        const handleRole = (role) => {
            // const user 
            user.role = role;
            setUser(user);
        }

        return <Modal
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
                    <Input placeholder="enter the name" value={user.name} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>Email</h6>
                </Col>
                <Col>
                    <Input value={user.email} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>Profile Picture</h6>
                </Col>
                <Col>
                    <img className="container-profile-picture"
                        style={{ height: "150px", width: "150px" , margin: "10px" , objectFit: "cover"}}
                        src={user.profilePicture ? `${API_URL}/images/${user.profilePicture}` : `${API_URL}/images/non-avatar.png`}
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
                        options={handleOptions()}
                        onChange={(e) => handleRole(e.target.value)}
                    />
                </Col>
            </Row>
        </Modal>
    } else {
        return null;
    }
}
