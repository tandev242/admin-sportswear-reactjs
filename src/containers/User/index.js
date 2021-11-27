import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    ButtonGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import Input from '../../components/UI/Input';
import UserInfoModal from '../../components/UserModal/UserInfoModal';
import { useDispatch, useSelector } from 'react-redux';
import "./style.scss";
import { deleteUserById } from "../../actions";

export default function User() {

    const user = useSelector(state => state.user);
    const [type, setType] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [userInfo, setUserInfo] = useState("");

    const dispatch = useDispatch();

    const filterUsers = (text, type) => {
        const arrUsers = getUsersByType(type).filter(user => isMatch(user, text));
        //Sort by descending 
        arrUsers.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        // sort by Ascending
        if (sort) {
            return arrUsers.reverse();
        }
        return arrUsers;
    }
    const getUsersByType = (type) => {
        if (type == "all") return user.users;
        else if (type == "admin") return user.users.filter(user => user.role == "admin");
        else if (type == "user") return user.users.filter(user => user.role == "user");
    }
    // check text exists in name or email
    const isMatch = (user, text) => {
        return user.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
            user.email.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    }

    const showInfoProfile = (user) => {
        setShowInfo(true);
        setUserInfo(user);
    }

    const handleSubmit = () => {
        setShowInfo(false);
        setUserInfo("");
    }

    const onDeleteUserById = (userId) => {
        if (window.confirm('Are you sure you want to delete this user') == true) {
            const payload = { _id: userId }
            dispatch(deleteUserById(payload));
        }
    }

    const renderTableUsers = (users) => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="col-name-sort" onClick={() => setSort(!sort)}>Name<UnfoldMoreIcon color="secondary" /></th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {users.length > 0 ? users.map((user, index) =>
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <img className="img-profile"
                                    src={user.profilePicture ? user.profilePicture : `https://res.cloudinary.com/dmtopd6ps/image/upload/v1632883166/non-avatar_yg1nky.png`}
                                    alt="no profile picture" />
                            </td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => showInfoProfile(user)}>
                                    Details
                                </button>
                                <button onClick={() => onDeleteUserById(user._id)}
                                >
                                    Del
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
                    : null}
            </Table>
        )
    }

    return (
        <Layout sidebar>
            <Container className="table-user">
                <Row>
                    <Col md={12}>
                        <div className="title">
                            <h3>Users</h3>
                            <Input type="text"
                                style={{ marginBottom: "-12px" }}
                                placeholder="Search by name/email"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} />
                            <div>
                                <ButtonGroup size="sm" className="btn-group-role">
                                    <DropdownButton
                                        className="dropdown-role" as={ButtonGroup}
                                        title={`seleted: ${type}`}
                                        id="bg-nested-dropdown"
                                        onSelect={(e) => setType(e)}
                                    >
                                        <Dropdown.Item eventKey="all">All</Dropdown.Item>
                                        <Dropdown.Item eventKey="user">User</Dropdown.Item>
                                        <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderTableUsers(filterUsers(searchText, type))}
                    </Col>
                </Row>
                <UserInfoModal
                    show={showInfo}
                    modalTitle={"User Info"}
                    handleClose={() => setShowInfo(false)}
                    user={userInfo}
                    onSubmit={handleSubmit}
                />
            </Container>
        </Layout>
    )
}
