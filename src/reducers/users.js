import {
    GET_USERS,
    ADD_POLL,
    SAVE_ANSWER,
} from "../actions/user";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        case ADD_POLL:
            const { author, id } = action.poll;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id]),
                },
            };
        case SAVE_ANSWER:
            const { authed, qid, answer } = action;
            return {
                ...state,
                [authed]: {
                    ...state[authed],
                    answers: {
                        ...state[authed].answers,
                        [qid]: answer,
                    },
                },
            };
        default:
            return state;
    }
}
