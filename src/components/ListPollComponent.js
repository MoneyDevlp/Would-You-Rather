import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PollItemComponent from "./PollItemComponent"
import { Button } from "react-bootstrap";

const ListPollComponent = (props) => {

    const [listPoll, setState] = useState("unanswered")

    const changeListPoll = (ev) => {
        ev.preventDefault();
        setState(ev.target.attributes[2].nodeValue)
    }

    useEffect(() => {
        const btnUnanswered = document.getElementById("btn-un");
        const btnAnswered = document.getElementById("btn-an");
        if(listPoll === "unanswered") {
            btnUnanswered.classList.add("poll-tab--active");
            btnAnswered.classList.remove("poll-tab--active")
        }
        if(listPoll === "answered") {
            btnAnswered.classList.add("poll-tab--active")
            btnUnanswered.classList.remove("poll-tab--active");
        }
    });

    return (
        <div className="poll-list">
            <div className="poll-list--tab">
                    <Button className="poll-list--btn" id="btn-un" value="unanswered" onClick={changeListPoll}>
                        Unanswered Questions
                    </Button>
                    <Button className="poll-list--btn" id="btn-an" value="answered" onClick={changeListPoll}>
                        Answered Questions
                    </Button>
            </div>
            <div className="poll-list--item">
            {listPoll === "unanswered" ?
                props?.unansweredList?.map((lid) => (<PollItemComponent key={lid} qid={lid} />)) :
                props?.answeredList?.map((lid) => (<PollItemComponent key={lid} qid={lid} />))}
            </div>
        </div>
    )
}

function mapStateToProps({ users, authed, questions }) {

    // Get list answered and unanswered
    const answeredList = Object.keys(users[authed].answers);
    const unansweredList = Object.keys(questions).filter((qid) => !answeredList.includes(qid));

    // return list answered and unanswered sort by time create
    return {
        answeredList: answeredList.sort((before, after) => questions[after].timestamp - questions[before].timestamp),
        unansweredList: unansweredList.sort((before, after) => questions[after].timestamp - questions[before].timestamp)
    }
}

export default connect(mapStateToProps)(ListPollComponent);