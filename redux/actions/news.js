import {
    NEWS_LINK_RESET,
    NEWS_LINK_SET,
    NEWS_MODAL_HIDE,
    NEWS_MODAL_SHOW
} from '../types'

export const resetNewsLink = () => async dispatch => {
    dispatch({
        type: NEWS_LINK_RESET
    })

    return true
}

export const setNewsLink = (link, source) => async dispatch => {
    const payload = {link: link, source: source}

    dispatch({
        type: NEWS_LINK_SET,
        payload: payload
    })
    
    return true
}

export const hideModal = () => dispatch => {
    dispatch({ type: NEWS_MODAL_HIDE })

    return Promise.resolve()
}

export const showModal = () => dispatch => {
    dispatch({ type: NEWS_MODAL_SHOW })
}