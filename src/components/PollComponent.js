import React from "react";
import { connect } from "react-redux";
import NoAnsweredPollComponent from "./NoAnsweredPollComponent"
import AnsweredPollComponent from "./AnsweredPollComponent"
import { useParams } from "react-router";

const PollComponent = (props) => {
    

        const {answeredPoll} = props;

        const qid = useParams();
        const userID = useParams();
        const voteOrNotVote = answeredPoll.includes(qid.qid.substring(0,qid.qid.length -4));

        // console.log("poll", voteOrNotVote)
        // console.log("que", qid.qid.substring(0,qid.qid.length -4))
        // console.log("us", (qid.qid.substring(qid.qid.length -4,qid.qid.length)).concat(userID.userID))

        return (
            <div>
                {voteOrNotVote ? <AnsweredPollComponent qid={qid.qid.substring(0,qid.qid.length -4)} 
                userid={(qid.qid.substring(qid.qid.length -4,qid.qid.length)).concat(userID.userID)}/> : 
                <NoAnsweredPollComponent qid={qid.qid.substring(0,qid.qid.length -4)} 
                userid={(qid.qid.substring(qid.qid.length -4,qid.qid.length)).concat(userID.userID)}/>}
            </div>
        )
    
}

function mapStateToProps({users, authed}) {

    // Get id question and check question vote or not vote
    //const qid = props.match;
    const answeredPoll = Object.keys(users[authed].answers);

    return {
        answeredPoll
    }
}

export default connect(mapStateToProps)(PollComponent);