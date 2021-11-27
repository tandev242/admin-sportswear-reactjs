import React, {useState} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions";
import EditUserModal from "../UserModal/EditUserModal"
import { updateUser } from "../../actions";
import './style.scss'
function Header(props) {

    const auth = useSelector((state) => state.auth);
    const [showEdit, setShowEdit] = useState(false);
    const [infoEdit, setInfoEdit] = useState("");

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    };

    const handleShowEditUser = () => {
        setShowEdit(true);
        setInfoEdit(auth.user);
    }

    const handleSubmitEditUser = () => {
        dispatch(updateUser(infoEdit));
        setShowEdit(false);
        setInfoEdit("");
    }


    const renderNonLoggedInLinks = () => {
        return <Nav>
            <li className="nav-item">
                <NavLink to="signin" className="nav-link" >
                    Signin
                </NavLink>
            </li>
        </Nav>
    }

    const renderLoggedInLinks = () => {
        return (
            <>
                <Nav>
                    <li className="nav-item">
                        <span className="nav-link" onClick={handleShowEditUser}>
                            {auth.user.name}
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={logout}>
                            Signout
                        </span>
                    </li>
                </Nav>
                <EditUserModal
                    show={showEdit}
                    modalTitle={"Edit Info"}
                    handleClose={() => setShowEdit(false)}
                    user={infoEdit}
                    setUser={setInfoEdit}
                    onSubmit={handleSubmitEditUser}
                />
            </>
        );
    }
    return (
        <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            bg="dark"
            variant="dark"
            style={{ zIndex: 1 }}
        >
            <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">
                    Admin Dashboard
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                    </Nav>
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Header;
