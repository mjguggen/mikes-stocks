import React, {useEffect, Fragment} from 'react'
import { 
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'

//Actions
import { getAllStocks } from '../redux/actions/allStocks'
import { getIntraDay, getQuote, getNews } from '../redux/actions/stockData'
import {getMarketOpen} from '../redux/actions/marketOpen'
import {
    loadStart,
    loadEnd,
    errorTrue,
    errorFalse
} from '../redux/actions/init'

//Components
import Error from './Error'

const Loading = props => {
    const load = async () => {
        if (props.watchlist.length > 0) {
            const allStocks = async () => {
                if (props.allStocks.length > 0) {
                    return true
                } else {
                    props.getAllStocks(props.allStocks)
                }
            }
                
            const intraDay = props.getIntraDay(props.watchlist)
            const getQuote = props.getQuote(props.watchlist)
            const getNews = props.getNews(props.watchlist)
            const getMarketOpen = props.getMarketOpen()

            const res = await Promise.all([allStocks(), intraDay, getQuote, getNews, getMarketOpen])
    
            const isTrue = (bool) => (
                bool === true
            )
    
            if (res.every(isTrue)) {
                return props.loadEnd()
            } else {
                props.errorTrue()
            }

            return
        } else {
            return props.loadEnd()
        }
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {!props.error ? 
                <ActivityIndicator/>
            : 
                <Error
                    loading={props.loading}
                    setLoading={props.setLoading}
                />
            }

        </View>
    )
}

const mapStateToProps = state => ({
    loading: state.init.loading,
    error: state.init.error,
    allStocks: state.allStocks,
    watchlist: state.watchlist.watchlist
})

export default connect(mapStateToProps, {
    getAllStocks,
    getIntraDay,
    getQuote,
    loadStart,
    loadEnd,
    errorTrue,
    errorFalse,
    getNews,
    getMarketOpen
})(Loading)