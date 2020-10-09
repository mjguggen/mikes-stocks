import {
    GET_MARKET_OPEN,
    INCREMENT_MARKET
} from '../types'

const initialState = {
    isOpen: false,
    counter: 0
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_MARKET_OPEN:
            return {
                ...state,
                isOpen: payload
            }
        case INCREMENT_MARKET:
            return {
                ...state,
                counter: payload
            }
        default: 
            return {
                ...state
            }
    }
}