import {
    NEWS_LINK_RESET,
    NEWS_LINK_SET,
    NEWS_MODAL_HIDE,
    NEWS_MODAL_SHOW,
} from '../types'

const initialState = {
    link: null,
    source: null,
    modal: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case NEWS_LINK_RESET:
            return {
                ...state,
                link: null,
                source: null
            }
        case NEWS_LINK_SET:
            return {
                ...state,
                link: payload.link,
                source: payload.source
            }
        case NEWS_MODAL_HIDE:
            return {
                ...state,
                modal: false
            }
        case NEWS_MODAL_SHOW:
            return {
                ...state,
                modal: true
            }
        default: 
            return state
    }
}