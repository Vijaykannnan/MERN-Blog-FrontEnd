import React from "react"
let session;
const SearchedDataAction = (val) => {
    // console.log("from action", val.data);
    return { type: 'searchedData', payload: val }
}

const ReacentaAddedItems = (val) => {
    // console.log("from action", val.data);
    return { type: 'recentDatas', payload: val, session }
}

const LoginUserSession = (val) => {
    // console.log("from action", val.data);
    // return { type: 'currentUser', payload: val }
    session = val
}


const initialState = {
    fields: []
}

const reducer = (state = initialState, action) => {
    // console.log("from reducer", action);
    switch (action.type) {
        case "searchedData":
            //console.log(state);
            return { ...state, fields: action.payload.data };
            break
        case "recentDatas":
            return { ...state, fields: action.payload.data, session };
            break
        // case "currentUser":
        // console.log("LoginUserSession", action.payload);
        // return { ...state, fields: action.payload.data.session }
        default:
            return state
    }

}



export { SearchedDataAction, ReacentaAddedItems, LoginUserSession, reducer }