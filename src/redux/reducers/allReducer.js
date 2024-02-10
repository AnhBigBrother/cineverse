import { combineReducers } from "redux";
import navBtnReducer from "./navBtnReducer.js";
import sessionIdReducer from "./sessionIdReducer.js";
import userInfReducer from "./userInfReducer.js";
import isFetchingTokenReducer from './isFetchingTokenReducer.js';


const allReducer = combineReducers({
    navBtn: navBtnReducer,
    sessionId: sessionIdReducer,
    userInf: userInfReducer,
    isFetchingToken: isFetchingTokenReducer,
})


export default allReducer;