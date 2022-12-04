import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Button from "react-bootstrap/Button";

class LoginComponent extends React.Component {

    state = {
        value: "select"
    }

    // handle when change user login
    changeUser = (ev) => {
        const value = ev.target.value;

        this.setState(() => ({
            value
        }));
    }

    // handle login
    submitLogin = (ev) => {
        ev.preventDefault();
        const { value } = this.state;
        this.setState({
            value: "select"
        })
        console.log(value)
        this.props.dispatch(setAuthedUser(value));
        //console.log("ok")
    }

    render() {

        const { ids, users } = this.props;

        return (
            <div className="card-login">
                <div className="card-login--header">
                    <h5 className="login-text--header text-big">Welcome to the Would You Rather App!</h5>
                    <p className="login-text--header text-small">
                        Please signin to continue
                    </p>
                </div>
                <Card.Img variant="top" className="card-login--img"
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1647492266631/rH6yDfWyJ.png" />
                <p style={{ textAlign: "center", color: "chocolate" }}
                    className="text-big">
                    Sign in
                </p>
                <Form onSubmit={this.submitLogin}>
                    <Form.Select aria-label="Default select example"
                        className="card-login--select"
                        value={this.state.value}
                        onChange={this.changeUser}
                    >
                        <option disabled value="select"
                            className="card-login--option" hidden>
                            Select user
                        </option>
                        {ids.map((user) => {
                            return (
                                <option key={user} value={user}>{users[user].name}</option>
                            )
                        })}
                    </Form.Select>
                    <Button type="submit" className="card-login--btn"
                        disabled={this.state.value === "select"}
                    >Sign in</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        ids: Object.keys(users),
        users
    }
}

export default connect(mapStateToProps)(LoginComponent);