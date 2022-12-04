import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { addNewPoll } from "../actions/util";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const NewPollComponent = (props) => {

    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")
    const navigate = useNavigate();

    const changeValueOptionOne = (ev) => {
        const value = ev.target.value;

        setOptionOne(value)
    }

    const changeValueOptionTwo = (ev) => {
        const value = ev.target.value;

        setOptionTwo(value)
    }

    const createQuestion = (ev) => {
        ev.preventDefault();
        const { dispatch, authed } = props;

        if (optionOne.length >= 100 || optionTwo.length >= 100) {
            alert("Please enter less than 100 characters!")
        }
        else {
            dispatch(addNewPoll({
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authed
            }))
            navigate("/")
        }
    }

    return (
        <div className="newPoll">
            <div className="newPoll-header">
                <h4 className="newPoll-header--text">Create New Question</h4>
            </div>
            <div className="newPoll-body">
                <p>Complete the question:</p>
                <h5>Would you rather...</h5>
                <div className="newPoll-body--form">
                    <Form onSubmit={createQuestion}>
                        <input type="text" name="optionOne" id="otpOne" className="newPoll-input" onChange={changeValueOptionOne}
                            maxLength={100} placeholder="Enter option one text here" />
                        <p>OR</p>
                        <input type="text" name="optionTwo" id="otpTwo" className="newPoll-input" onChange={changeValueOptionTwo}
                            maxLength={100} placeholder="Enter option two text here" />
                        <Button className="newPoll-button" type="submit"
                            disabled={optionOne === "" || optionTwo === ""}>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )

}

function mapStateToProps({ authed }) {
    return { authed }
}

export default connect(mapStateToProps)(NewPollComponent);