import {
    WATCHLIST_ADD,
    WATCHLIST_REMOVE,
    WATCHLIST_MOVE,
    WATCHLIST_SET_ACTIVE,
    WATCHLIST_REMOVE_ACTIVE,
    WATCHLIST_UPDATE
} from '../types'

export const addToWatchlist = (symbol, arr) => async dispatch => {

    const filteredArr = arr.filter(i => i === symbol)

    if (filteredArr.length > 0) {
        return
    }

    const output = [...arr]

    output.push(symbol)

    dispatch({
        type: WATCHLIST_UPDATE,
        payload: output
    })

    return true
}

export const removeFromWatchlist = (index, arr) => async dispatch => {

    if (arr.length === 1) {
        return dispatch({
            type: WATCHLIST_UPDATE,
            payload: []
        })
    }

    const output = [...arr]

    output.splice(index, 1)

    dispatch({
        type: WATCHLIST_UPDATE,
        payload: output
    })
}

export const moveWatchlist = (arr) => async dispatch => {
    const output = arr

    dispatch({
        type: WATCHLIST_UPDATE,
        payload: output
    })
}


export const setActiveSymbol = (symbol) => async dispatch => {
    dispatch({
        type: WATCHLIST_SET_ACTIVE,
        payload: symbol
    })
}

export const removeActiveSymbol = () => dispatch => {
    dispatch({
        type: WATCHLIST_REMOVE_ACTIVE
    })
}