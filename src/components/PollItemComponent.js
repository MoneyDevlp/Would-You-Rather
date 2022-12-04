import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

class PollItemComponent extends React.Component {
    render() {

        const { username, avata, option, question_id } = this.props;

        return (
            <div className="poll-item">
                <div className="poll-item--header">
                    <h5 className="poll-item--name">{username} asks:</h5>
                </div>
                <div className="poll-item--info">
                    <div className="poll-item--img">
                        <Card.Img className="poll-item--avt" variant="top" src={avata} />
                    </div>
                    <div className="poll-item--question">
                        <h5 style={{ fontSize: "15px" }}>Would you rather</h5>
                        <p style={{wordWrap: "break-word"}}>...{option}...</p>
                        <Button className="poll-item--btn" as={Link} to={`questions/${question_id}`}>View Poll</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }, { question_id }) {

    // Get info user and option of question
    const username = users[questions[question_id].author].name;
    const avata = users[questions[question_id].author].avatarURL;
    const option = questions[question_id].optionOne.text;

    return {
        username,
        avata,
        option
    }
}

export default connect(mapStateToProps)(PollItemComponent);