export const GET_QUESTIONS = "GET_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

// handle get all question
export function getAllQuestion(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}


// handle when user add question
export function addNewQuestion(question) {
    return {
      type: ADD_QUESTION,
      question
    }
}

// handle when user save question
export function saveQuestion({ authed, qid, answer }) {
  return {
    type: SAVE_QUESTION,
    authed,
    qid,
    answer
  }
}


