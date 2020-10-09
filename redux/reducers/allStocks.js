import {
    GET_ALL_STOCKS
} from '../types'

const initialState = []

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_ALL_STOCKS:
            return payload;
        default:
            return state;
    }
}