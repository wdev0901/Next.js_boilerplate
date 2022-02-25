import { getCustomRoute } from "next/dist/server/server-route-utils";
import * as t from "../types";

const main = (state = {}, action) => {
    let ISSERVER;
    switch(action.type) {
        case t.AUTH:
            ISSERVER = typeof window === "undefined";
            if (!ISSERVER) {
                localStorage.setItem('userInfo', JSON.stringify({ ...action?.payload }));
            }
            return { ...state, userInfo: action.payload };
        case t.LOGOUT:
            ISSERVER = typeof window === "undefined";
            if(!ISSERVER) {
                localStorage.removeItem('useInfo');
            }
            return { ...state, userInfo: null };
        case t.LOGINERROR:
            return { ...state, errorMsg: action.payload };
        default:
            return state;
    }
}

export default main;