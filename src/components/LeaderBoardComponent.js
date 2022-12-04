import React from "react";
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';

class LeaderBoardComponent extends React.Component {
    render() {

        const { users } = this.props;

        function answeredQuestion(id) {
            return Object.keys(users[id].answers).length
        }

        return (
            <div className="leaderBoard">
                {this.props.usersID.map((id) => (
                    <div className="leaderBoard-item" key={id}>
                        <div className="cardBoard-img">
                            <Card.Img className="cardBoard-avt" src={users[id].avatarURL} />
                        </div>
                        <div className="cardBoard-info">
                            <h4>{users[id].name}</h4>
                            <p>Answered question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>{answeredQuestion(id)}</b></p>
                            <hr></hr>
                            <p>Created question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>{users[id].questions.length}</b></p>
                        </div>
                        <div className="cardBoard-score">
                            <p>&nbsp;SCORE</p>
                            <p className="score-point">
                                {(answeredQuestion(id)) + (users[id].questions.length)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {

    // Get user and handle sort user by answer and question
    return {
        usersID: Object.keys(users).sort((before, after) =>
            Object.keys(users[after].answers).length + users[after].questions.length -
            (Object.keys(users[before].answers).length + users[before].questions.length)
        ),
        users
    }
}

export default connect(mapStateToProps)(LeaderBoardComponent);