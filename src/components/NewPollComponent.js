import React from "react";
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { addNewPoll } from "../actions/util";
import Button from 'react-bootstrap/Button';

class NewPollComponent extends React.Component {

    state = {
        optionOne: "",
        optionTwo: ""
    }

    changeValueOption = (ev) => {
        const optionVal = ev.target;
        const name = optionVal.name;
        const value = optionVal.value;

        // console.log("name",name)
        // console.log("val",value)

        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    createQuestion = (ev) => {
        ev.preventDefault();
        const { dispatch, authed  } = this.props;
        const { optionOne, optionTwo } = this.state;

        if(optionOne.length >= 100 || optionTwo.length >= 100) {
            alert("Please enter less than 100 characters!")
        }
        else {
            dispatch(addNewPoll({
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: authed
            }))
            alert("Add new poll successfull! Back to home page to see new poll")
            document.getElementById("otpOne").value = " "
            document.getElementById("otpTwo").value = " "   
        }
    }

    render() {

        const { optionOne, optionTwo } = this.state;

        return (
            <div className="newPoll">
                <div className="newPoll-header">
                    <h4 className="newPoll-header--text">Create New Question</h4>
                </div>
                <div className="newPoll-body">
                    <p>Complete the question:</p>
                    <h5>Would you rather...</h5>
                    <div className="newPoll-body--form">
                    <Form onSubmit={this.createQuestion}>
                        <input type="text" name="optionOne" id="otpOne" className="newPoll-input" onChange={this.changeValueOption} 
                        maxLength={100} placeholder="Enter option one text here" />
                        <p>OR</p>
                        <input type="text" name="optionTwo" id="otpTwo" className="newPoll-input" onChange={this.changeValueOption}  
                        maxLength={100} placeholder="Enter option two text here" />
                        <Button className="newPoll-button" type="submit"
                        disabled={optionOne === "" || optionTwo === ""}>Submit</Button>
                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authed}) {
    return {authed}
}

export default connect(mapStateToProps)(NewPollComponent);