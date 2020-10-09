import {
    GET_ALL_STOCKS
} from '../types'

import api from '../../utils/api'

export const getAllStocks = (initArr) => async dispatch => {
    try {
        const res = await api.get('/allstocks')

        dispatch({
            type: GET_ALL_STOCKS,
            payload: res.data
        })

        return true
    } catch (error) {
        return false
    }
}