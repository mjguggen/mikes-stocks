import {
    DATA_GET_INTRADAY,
    DATA_GET_QUOTE,
    SET_NEWS,
    DATA_REMOVE,
    DATA_GET_CHART,
    DATA_CHART_RESET
} from '../types'

import api from '../../utils/api'

export const getIntraDay = (tickerArr) => async dispatch => {
    try {
        const res = await api.post('/intraday', tickerArr)

        dispatch({
            type: DATA_GET_INTRADAY,
            payload: res.data
        })

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const getQuote = (tickerArr) => async dispatch => {
    try {
        const res = await api.post('/stock/quote', tickerArr)

        dispatch({
            type: DATA_GET_QUOTE,
            payload: res.data
        })

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const getNews = (tickerArr) => async dispatch => {
    try {
        const res = await api.post('/news', tickerArr)

        dispatch({
            type: SET_NEWS,
            payload: res.data
        })
        
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export const removeStockData = (symbol, intraDayData, quoteData, newsData) => async dispatch => {

    delete intraDayData[symbol] 
    delete quoteData[symbol]
    newsData.filter(i => i.related !== symbol)

    const payload = {
        intraDay: intraDayData,
        quote: quoteData,
        news: newsData
    }

    dispatch({
        type: DATA_REMOVE,
        payload: payload
    })
}

export const getChartData = (symbol, range) => async dispatch => {
    try {
        let res = await api.post('/chart', {symbol: symbol, range: range})

        dispatch({
            type: DATA_GET_CHART,
            payload: res.data
        })

        return true
    } catch (error) {
        return false
    }
}

export const resetChart = () => async dispatch => {
    dispatch({
        type: DATA_CHART_RESET
    })
}