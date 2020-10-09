import {
    GET_MARKET_OPEN,
    INCREMENT_MARKET
} from '../types'

import api from '../../utils/api'

export const getMarketOpen = (counter) => async dispatch => {
    try {
        let res = await api.get('/marketopen')
        const payload = res.data["NDAQ"].securityEvent === "MarketClose" ? false : true

        dispatch({
            type: GET_MARKET_OPEN,
            payload: payload
        })

        if (payload) {
            dispatch({
                type: INCREMENT_MARKET,
                payload: counter + 1
            })
        }

        return true
    } catch (error) {
        return false
    }
}