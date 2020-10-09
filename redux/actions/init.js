import {
    INIT_ERROR_FALSE,
    INIT_ERROR_TRUE,
    INIT_LOADING_END,
    INIT_LOADING_START
} from '../types'

export const loadStart = () => dispatch => {
    dispatch({
        type: INIT_LOADING_START
    })
}

export const loadEnd = () => dispatch => {
    dispatch({
        type: INIT_LOADING_END
    })
}

export const errorTrue = () => dispatch => {
    dispatch({
        type: INIT_ERROR_TRUE
    })
}

export const errorFalse = () => dispatch => {
    dispatch({
        type: INIT_ERROR_FALSE
    })
}