import {
    WATCHLIST_SET_ACTIVE,
    WATCHLIST_REMOVE_ACTIVE,
    WATCHLIST_UPDATE
} from '../types'

const initialState = {
    watchlist: ["AAPL", "GOOGL", "PYPL", "AMZN", "UBER"],
    activeSymbol: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case WATCHLIST_SET_ACTIVE:
            return {
                ...state,
                activeSymbol: payload
            }
        case WATCHLIST_REMOVE_ACTIVE:
            return {
                ...state,
                activeSymbol: null
            }
        case WATCHLIST_UPDATE:
            return {
                ...state,
                watchlist: payload
            }
        default: 
            return {
                ...state
            }
    }
}