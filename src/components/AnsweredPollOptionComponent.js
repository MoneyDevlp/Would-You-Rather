import React from "react";
import { connect } from "react-redux";

const AnsweredPollOptionComponent = (props) => {

    const { numVote, voteTotal, optionVal, voted, option } = props;

    //console.log("ques", questions[qid].optionOne.votes)

    return (
        <div className={voted === option ? "pollAnsResult voted" : "pollAnsResult no-vote"}>
            <h5 className="pollAnsResult-question">Would you rather {optionVal} ?</h5>
            <p className="percentVote"
                style={{ width: `${Math.round((numVote / voteTotal) * 100)}%`, backgroundColor: "darksalmon", color: "white", height: "28px" }}>
                {`${Math.round((numVote / voteTotal) * 100)}%`}
            </p>
            <p className="pollAnsResult-vote">{numVote} out of {voteTotal} {voteTotal > 1 ? "votes" : "vote"}</p>
        </div>
    )
}

function mapStateToProps({ users, authed, questions }, { option, qid }) {

    // Get value option, number vote and calculater total vote
    const numVote = questions[qid][option].votes.length;
    const voteTotal = questions[qid].optionOne.votes.length + questions[qid].optionTwo.votes.length;
    const optionVal = questions[qid][option].text;

    // Get option you choice
    const voted = users[authed].answers[qid];

    return {
        numVote,
        voteTotal,
        optionVal,
        voted,
        option
    }
}

export default connect(mapStateToProps)(AnsweredPollOptionComponent)