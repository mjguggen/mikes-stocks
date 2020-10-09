import { combineReducers } from 'redux';
import allStocks from './allStocks'
import watchlist from './watchlist'
import stockData from './stockData'
import init from './init'
import news from './news'
import marketOpen from './marketOpen'

export default combineReducers({
    allStocks,
    watchlist,
    stockData,
    init,
    news,
    marketOpen
})