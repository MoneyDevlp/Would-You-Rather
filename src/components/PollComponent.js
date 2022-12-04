import React from "react";
import { connect } from "react-redux";
import NoAnsweredPollComponent from "./NoAnsweredPollComponent"
import AnsweredPollComponent from "./AnsweredPollComponent"
import { useParams } from "react-router";
import Page404Component from '../components/Page404Component'

const PollComponent = (props) => {


    const { answeredPoll,questions } = props;

    const question_id = useParams();
    const voteOrNotVote = answeredPoll.includes(question_id.question_id);

    if(!questions[question_id.question_id]) {
        return <Page404Component />
    }

    return (
        <div>
            {voteOrNotVote ? <AnsweredPollComponent qid={question_id.question_id}
            /> :
                <NoAnsweredPollComponent qid={question_id.question_id}
                />}
        </div>
    )

}

function mapStateToProps({ users, questions, authed }) {

    // Get id question and check question vote or not vote
    //const qid = props.match;
    const answeredPoll = Object.keys(users[authed].answers);

    return {
        answeredPoll,
        questions
    }
}

export default connect(mapStateToProps)(PollComponent);