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
import EditUserModal from './components/EditUserModal';
import AddUserModal from './components/AddUserModal';
import { useDispatch, useSelector } from 'react-redux';
import "./style.scss";
import { API_URL } from "../../actions/constants";


export default function User() {

    const user = useSelector(state => state.user);
    const [type, setType] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState(null);

    const filterUsers = (text, type) => {
        const arrUsers = getUsersByType(type);
        arrUsers.filter(user => isMatch(user, text));

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

    const showEditProfile = (user) =>{
        setShowEdit(true);
        setInfoEdit(user);
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
                                    src={user.profilePicture ? `${API_URL}/images/${user.profilePicture}` : `${API_URL}/images/non-avatar.png`}
                                    alt="no profile picture" />
                            </td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => showEditProfile(user)}>
                                    Edit
                                </button>
                                <button
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
                                <Button style={{ backgroundColor: "green" }} onClick={() => setShowAdd(true)}>Add</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderTableUsers(filterUsers(searchText, type))}
                    </Col>
                </Row>
                <EditUserModal
                    show={showEdit}
                    modalTitle={"Edit User"}
                    handleClose={() => setShowEdit(false)}
                    user={infoEdit}
                    setUser={setInfoEdit}
                    onSubmit
                />
                <AddUserModal
                    show={showAdd}
                    modalTitle={"Add New User"}
                    handleClose={() => setShowAdd(false)}
                />
            </Container>
        </Layout>
    )
}
