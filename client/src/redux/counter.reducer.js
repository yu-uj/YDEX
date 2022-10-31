// counter.reducer.js
// Action Types
const SET_CW = "SET_CW";
const SET_CTK = "SET_CTK";

const initialState = {
    number: "Connect Wallet",
    number1: "Connect to Kaikas",
};

export default function counter(state = initialState, action) {

    switch (action.type) {
        case SET_CW:
            return {
                ...state,
                number: action.number
            };
        case SET_CTK:
            return {
                ...state,
                number1: action.number1
            };

        default:
            return state;
    }
};