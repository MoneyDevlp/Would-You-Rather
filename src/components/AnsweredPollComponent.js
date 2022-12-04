import React from "react";
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import AnsweredPollOptionComponent from "./AnsweredPollOptionComponent"

const AnsweredPollComponent = (props) => {

    const { username, avataUrl, qid } = props;

    return (
        <div className="pollAnswerd">
            <div className="pollAnswerd-header">
                <h5 className="pollAnswerd-name">Asked by {username}</h5>
            </div>
            <div className="pollAnswerd-info">
                <div className="pollAnswerd-img">
                    <Card.Img className="pollAnswerd-avt" src={avataUrl} />
                </div>
                <div className="pollAnswerd-result">
                    <h4>Results:</h4>
                    <AnsweredPollOptionComponent option="optionOne" qid={qid} />
                    <AnsweredPollOptionComponent option="optionTwo" qid={qid} />
                </div>
            </div>
        </div>
    )
}

function mapStateToProps({ users, questions }, { qid }) {

    // Get info user
    const userID = questions[qid].author;
    const username = users[userID].name;
    const avataUrl = users[userID].avatarURL;

    return {
        username,
        avataUrl,
        qid
    }
}

export default connect(mapStateToProps)(AnsweredPollComponent);