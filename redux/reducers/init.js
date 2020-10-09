import {
    INIT_ERROR_FALSE,
    INIT_ERROR_TRUE,
    INIT_LOADING_END,
    INIT_LOADING_START
} from '../types'

const initialState = {
    loading: true,
    error: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case INIT_ERROR_FALSE:
            return {
                ...state,
                error: false
            };
        case INIT_ERROR_TRUE:
            return {
                ...state,
                error: true
            };
        case INIT_LOADING_START:
            return {
                ...state,
                loading: true
            };
        case INIT_LOADING_END:
            return {
                ...state,
                loading: false
            };
        default: 
            return state;
    }
}