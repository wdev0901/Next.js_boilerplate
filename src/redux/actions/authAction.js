import * as t from "../types";
import { useRouter } from "next/router";

export const setInfo = (name) => dispatch => {
    dispatch({
        type: t.SET_NAME,
        payload: name
    });
}

export const signin = (data) => dispatch => {
    try {
        dispatch({
            type: t.AUTH,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}