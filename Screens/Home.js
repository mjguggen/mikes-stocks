import React, {useState, useEffect, useRef, Fragment} from 'react'
import { 
    View,
    ScrollView,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'

//Screens
import Loading from './Loading'
import StockModal from '../Components/StockModal'

//Components
import Header from '../Components/Header'
import SearchBar from '../Components/SearchBar'
import Footer from '../Components/Footer'
import NewsBottomSheet from '../Components/NewsBottomSheet'
import Watchlist from '../Components/Watchlist'

//Actions
import {getAllStocks} from '../redux/actions/allStocks'
import {getMarketOpen} from '../redux/actions/marketOpen'
import { getIntraDay, getQuote, getNews } from '../redux/actions/stockData'

import {
    loadStart,
    loadEnd,
    errorTrue,
    errorFalse
} from '../redux/actions/init'


//Style
import { style, globalStyle } from '../style'

const Home = props => {
    const [searchFocus, setSearchFocus] = useState(false)
    const [modalTop, setModalTop] = useState(false)
    const [modalBottom, setModalBottom] = useState(true)
    const [edit, setEdit] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [toggleBlur, setToggleBlur] = useState(true)
    const [stockModal, setStockModal] = useState(false)
    const [stockModalTop, setStockModalTop] = useState(false)

    const toggle = () => {
        if (toggleBlur) {
            return setToggleBlur(false)
        } else {
            setToggleBlur(true)
        }
    }

    useEffect(() => {
        if (props.watchlist.length > 0) {
            props.getIntraDay(props.watchlist)
            props.getQuote(props.watchlist)
        }
    }, [props.watchlist])

    //get data CRON job
    useEffect(() => {
        if(props.marketOpen) {
            props.getIntraDay(props.watchlist)
            props.getQuote(props.watchlist)
        }

        if (props.marketOpen && props.counter % 5 === 0) {
            props.getNews(props.watchlist)
        }
    }, [props.counter])


    //CRON job
    setInterval(function() {
        props.getMarketOpen(props.counter)
    }, 1000*60*15)

    //open news browser
    useEffect(() => {
        if (props.newsLink !== null) {
            props.navigation.navigate("NewsBrowser")
        }
    }, [props.newsLink])

    return (
        <View style={style().screen}>
            {
                props.loading ? 
                    <Loading/>
                : 
                    <Fragment>
                        <SafeAreaView style={style().safeArea}>
                            <Header
                                searchFocus={searchFocus}
                                setSearchFocus={setSearchFocus}
                                modalTop={modalTop}
                                edit={edit}
                                setEdit={setEdit}
                                stockModalTop={stockModalTop}
                            />

                            <SearchBar
                                searchFocus={searchFocus}
                                setSearchFocus={setSearchFocus}
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                                toggleBlur={toggleBlur}
                            />

                            <Watchlist
                                searchFocus={searchFocus}
                                setSearchFocus={setSearchFocus}
                                searchInput={searchInput}
                                toggle={toggle}
                                edit={edit}
                            />
                        </SafeAreaView>

                        <NewsBottomSheet
                            modalTop={modalTop}
                            setModalTop={setModalTop}
                            modalBottom={modalBottom}
                            setModalBottom={setModalBottom}
                            searchFocus={searchFocus}
                            edit={edit}
                            stockModal={stockModal}
                        />

                        <Footer
                            edit={edit}
                            setSearchFocus={setSearchFocus}
                        />
                    </Fragment>
            }

            <StockModal
                stockModal={stockModal}
                setStockModal={setStockModal}
                setStockModalTop={setStockModalTop}
            />
        </View>
    )
}

const mapStateToProps = state => ({
    loading: state.init.loading,
    error: state.init.error,
    allStocks: state.allStocks,
    state: state,
    watchlist: state.watchlist.watchlist,
    newsLink: state.news.link,
    marketOpen: state.marketOpen.isOpen,
    counter: state.marketOpen.counter
})

export default connect(mapStateToProps, {
    getAllStocks,
    loadStart,
    loadEnd,
    errorTrue,
    errorFalse,
    getMarketOpen,
    getIntraDay, 
    getQuote, 
    getNews
})(Home)