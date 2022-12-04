import {
    GET_QUESTIONS,
    ADD_QUESTION,
    SAVE_QUESTION,
} from "../actions/question";

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return action.questions;
        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [question.id]: question,
            };
        case SAVE_QUESTION:
            const { authed, qid, answer } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authed]),
                    },
                },
            };
        default:
            return state;
    }
}
