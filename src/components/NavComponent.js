import React from "react";
import { connect } from "react-redux";
import deleteAuthedUser from "../actions/authedUser"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

const NavComponent = (props) => {

    const logOut = () => {
        props.dispatch(deleteAuthedUser());
    }

    const {authed, users} = props;

    const username = authed ? users[authed].name : "";
    const avataUrl = authed ? users[authed].avatarURL : "";

    return (
        <div className="nav">
            <div>
                <Navbar variant="light">
                    <Container>
                        <Nav className="navbar">
                            <Nav.Link className="nav-link" as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link className="nav-link" as={NavLink} to="/add">New Question</Nav.Link>
                            <Nav.Link className="nav-link" as={NavLink} to="/leaderboard">Leader Board</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Navbar.Text>
                    {props.authed !== null ? (
                        <div className="userLogin">
                            <div className="infoUser">
                                Hi <b>{username}</b>
                            </div>
                            <div>
                                <Image
                                    src={avataUrl}
                                    className="avataUser"
                                />
                            </div>
                            <div>
                                <Button className="btn-logout" variant="success" onClick={logOut}>
                                    Logout
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </Navbar.Text>
            </div>
        </div>
    )
}

function mapStateToProps({ users, authed }) {

    return {
        authed,
        users
    }
}

export default connect(mapStateToProps)(NavComponent);