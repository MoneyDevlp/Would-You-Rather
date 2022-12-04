
let users = {
    akahi: {
        id: "akahi",
        name: "Sarah Akahi",
        avatarURL: "/avata_one.png",
        answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionTwo",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
    jiseo: {
        id: "jiseo",
        name: "Tyler Jiseos",
        avatarURL: "/avata_two.jpg",
        answers: {
            vthrdm985a262al8qx3do: "optionOne",
            xj352vofupe1dqz9emx13r: "optionTwo",
        },
        questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
    okami: {
        id: "okami",
        name: "John Okami",
        avatarURL: "/avata_three.jpg",
        answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionTwo",
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
    },
};

let questions = {
    "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "akahi",
        timestamp: 1467166872634,
        optionOne: {
            votes: ["akahi"],
            text: "have horrible short term memory",
        },
        optionTwo: {
            votes: [],
            text: "have horrible long term memory",
        },
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "okami",
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: "become a superhero",
        },
        optionTwo: {
            votes: ["okami", "sarahedo"],
            text: "become a supervillain",
        },
    },
    am8ehyc8byjqgar0jgpub9: {
        id: "am8ehyc8byjqgar0jgpub9",
        author: "akahi",
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: "be telekinetic",
        },
        optionTwo: {
            votes: ["akahi"],
            text: "be telepathic",
        },
    },
    loxhs1bqm25b708cmbf3g: {
        id: "loxhs1bqm25b708cmbf3g",
        author: "jiseo",
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: "be a front-end developer",
        },
        optionTwo: {
            votes: ["akahi"],
            text: "be a back-end developer",
        },
    },
    vthrdm985a262al8qx3do: {
        id: "vthrdm985a262al8qx3do",
        author: "jiseo",
        timestamp: 1489579767190,
        optionOne: {
            votes: ["tylermcginnis"],
            text: "find $50 yourself",
        },
        optionTwo: {
            votes: ["okami"],
            text: "have your best friend find $500",
        },
    },
    xj352vofupe1dqz9emx13r: {
        id: "xj352vofupe1dqz9emx13r",
        author: "okami",
        timestamp: 1493579767190,
        optionOne: {
            votes: ["okami"],
            text: "write JavaScript",
        },
        optionTwo: {
            votes: ["jiseo"],
            text: "write Swift",
        },
    },
};

function generateUID() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

export function _getUsers() {
    return new Promise((res) => {
        setTimeout(() => res({ ...users }), 1000);
    });
}

export function _getQuestions() {
    return new Promise((res) => {
        setTimeout(() => res({ ...questions }), 1000);
    });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        },
    };
}

export function _saveQuestion(question) {
    return new Promise((res) => {
        const authed = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion,
            };

            users = {
                ...users,
                [authed]: {
                    ...users[authed],
                    questions: users[authed].questions.concat([formattedQuestion.id]),
                },
            };

            res(formattedQuestion);
        }, 1000);
    });
}

export function _saveQuestionAnswer({ authed, qid, answer }) {
    return new Promise((res) => {
        setTimeout(() => {
            users = {
                ...users,
                [authed]: {
                    ...users[authed],
                    answers: {
                        ...users[authed].answers,
                        [qid]: answer,
                    },
                },
            };

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authed]),
                    },
                },
            };

            res();
        }, 1000);
    });
}
