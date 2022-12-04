import React from "react";
import { connect } from "react-redux";
import Form from 'react-bootstrap/Form';
import { savePollAnswer } from "../actions/util";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class NoAnsweredPollComponent extends React.Component {

    state = {
        optionChoice: null
    }
    
    // handle when choice option

    changeOption = (ev) => {
        const optionChoice = ev.target.value;
        this.setState(() => ({optionChoice}))
    }

    // handle when submit option

    submitOption = (ev) => {
        ev.preventDefault();
        const { authed, qid } = this.props;
        const optionChoice = this.state.optionChoice;
        this.props.dispatch(savePollAnswer({
            authed,
            qid,
            answer: optionChoice
        }))
    }

    render () {

        const {username, avataUrl, optionOne, optionTwo} = this.props;

        return (
            <div className="pollNoAnswer">
                    <div className="pollNoAnswer--header">
                        <h5 className="pollNoAnswer--name">{username} asks:</h5>
                    </div>
                    <div className="pollNoAnswer--info">
                        <div className="pollNoAnswer--img">
                            <Card.Img className="pollNoAnswer--avt" src={avataUrl} />
                        </div>
                        <div className="pollNoAnswer--question">
                            <h4>Would you rather...</h4>
                            <Form onSubmit={this.submitOption}>
                                <Form.Check type="radio" name="option" value="optionOne" label={optionOne.text} onChange={this.changeOption} />
                                <Form.Check type="radio" name="option" value="optionTwo" label={optionTwo.text} onChange={this.changeOption} />
                                <Button className="pollNoAnswer--btn" type="submit">Submit</Button>
                            </Form>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps({users, authed, questions}, {qid,userid}) {

    // Get info user
    const username = users[userid].name;
    const avataUrl = users[userid].avatarURL;

    // Get option one and option two
    const optionOne = questions[qid].optionOne;
    const optionTwo = questions[qid].optionTwo;

    return {
        username,
        avataUrl,
        optionOne,
        optionTwo,
        authed
    }
}

export default connect(mapStateToProps)(NoAnsweredPollComponent);