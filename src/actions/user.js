export const GET_USERS = "GET_USERS";
export const ADD_POLL = "ADD_POLL";
export const SAVE_ANSWER = "SAVE_ANSWER";

// handle get all user
export function getAllUser(users) {
    return {
      type: GET_USERS,
      users
    }
}

// handle when user create new poll
export function createNewPoll(poll) {
    return {
      type: ADD_POLL,
      poll
    }
}

// handle when user save question
export function saveAnswer({ authed, qid, answer }) {
    return {
      type: SAVE_ANSWER,
      authed,
      qid,
      answer
    }
}
  
  