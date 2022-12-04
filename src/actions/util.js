import { getAllUser, createNewPoll, saveAnswer } from "./user.js";
import { getAllQuestion, addNewQuestion, saveQuestion } from "./question.js";
import { saveQuestionAnswer, saveQuestionUser } from "./api.js";
import {
    _getUsers,
    _getQuestions
} 
from "../_DATA.js";

// handle init data
export default function handleInitialData() {
    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions()])
            .then(([users, questions]) => {
                dispatch(getAllQuestion(questions));
                dispatch(getAllUser(users));
            })
            .catch((e) => {
                console.warn("Error: ", e);
            });
    };
}

// handle create new poll
export function addNewPoll(info) {
    return (dispatch) => {
        return saveQuestionUser(info)
            .then((poll) => {
                dispatch(addNewQuestion(poll));
                dispatch(createNewPoll(poll));
            })
            .catch((e) => {
                console.warn("Error: ", e);
            });
    };
}

//handle save answer and question
export function savePollAnswer(info) {
    return (dispatch) => {
        dispatch(saveQuestion(info));
        dispatch(saveAnswer(info));
        return saveQuestionAnswer(info)
            .then(() => console.log("Vote done"))
            .catch((e) => {
                console.warn("Error: ", e);
            });
    };
}
