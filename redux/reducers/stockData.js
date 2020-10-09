import {
    DATA_GET_INTRADAY,
    DATA_GET_QUOTE,
    SET_NEWS,
    DATA_REMOVE, DATA_GET_CHART, DATA_CHART_RESET
} from '../types'

const initialState = {
    intraDay: null,
    quote: null,
    news: null,
    chart: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case DATA_GET_INTRADAY:
            return {
                ...state,
                intraDay: payload
            }
        case DATA_GET_QUOTE:
            return {
                ...state,
                quote: payload
            }
        case SET_NEWS:
            return {
                ...state,
                news: payload
            }
        case DATA_REMOVE:
            return {
                ...state,
                intraDay: payload.intraDay,
                quote: payload.quote,
                news: payload.news
            }
        case DATA_GET_CHART:
            return {
                ...state,
                chart: payload
            }
        case DATA_CHART_RESET:
            return {
                ...state,
                chart: []
            }
        default: 
            return state
    }
}