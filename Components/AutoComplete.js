import React, {Fragment, useState, useEffect} from 'react'
import { 
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    SectionList,
} from 'react-native'
import {connect} from 'react-redux'

//Style
import {
    style,
    globalStyle
} from '../style'

//Actions
import {
    addToWatchlist,
    setActiveSymbol
} from '../redux/actions/watchlist'
import { symbol } from 'd3-shape'

const AutoComplete = props => {
    const [auto, setAuto] = useState([
        {
            title: "Watchlist",
            data: []
        },
        {
            title: "Symbols",
            data: []
        },
    ])

    const [noResults, setNoResults] = useState(false)

    const noneFound = () => {
        setAuto(null)
        setNoResults(true)
    }

    useEffect(() => {
        filter()
    }, [props.searchInput])

    const filter = () => {
        setNoResults(false)

        const input = props.searchInput.toUpperCase()

        const watchlist = props.watchlist.filter(output =>
            output.substr(0, input.length) === input
        )

        const symbols = props.allStocks.filter(output => 
            output.symbol.substr(0, input.length) === input
        )

        symbols.filter((i,index) => 
            props.watchlist.includes(i.symbol) 
                ? symbols.splice(index, 1)
                : null
        )

        watchlist.length > 0 || symbols.length > 0
            ?
                setAuto([
                    {
                        title: "Watchlist",
                        data: watchlist
                    },
                    {
                        title: "Symbols",
                        data: symbols
                    },
                ])
            : noneFound()
    }

    const Stock = ({item, title}) => {
        return (
            <View
                style={{
                    paddingLeft: globalStyle.elPadding
                }}
            >
                {title === "Symbols"
                    ?
                        <TouchableOpacity
                            style={{
                                ...style().watchlistElement,
                                paddingRight: globalStyle.elPadding,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}
                            onPress={() => symbolPressed(item.symbol, props.watchlist)}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Text
                                    style={{
                                        ...style().symbol,
                                        marginRight: 10,

                                    }}
                                >
                                    {item.symbol}
                                </Text>

                                <Text
                                    style={{
                                        color: globalStyle.color.elMedium,
                                        fontSize: 12,
                                    }}
                                >
                                    {item.type.toUpperCase()}
                                </Text>
                            </View>

                            <Text
                                style={style().companyName}
                            >
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            style={{
                                ...style().watchlistElement,
                                paddingRight: globalStyle.elPadding,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}
                            onPress={() => watchlistPressed(item)}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Text
                                    style={{
                                        ...style().symbol,
                                        marginRight: 10,

                                    }}
                                >
                                    {item}
                                </Text>

                                <Text
                                    style={{
                                        color: globalStyle.color.elMedium,
                                        fontSize: 12,
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>

                            <Text
                                style={style().companyName}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                }
                
            </View>

        )
    }

    const ItemSeperator = () => (
        <View
            style={{
                ...style().divider,
                marginLeft: globalStyle.elPadding
            }}
        />
    )

    const SectionHeader = ({title}) => {
        if(title === 'Watchlist' && auto[0].data.length !== 0) {
            return (
                <Fragment>
                    <Text 
                        style={{
                            ...style().title,
                            color: globalStyle.color.white,
                            paddingLeft: globalStyle.elPadding,
                            paddingRight: globalStyle.elPadding,
                            paddingTop: globalStyle.vertPadding,
                            paddingBottom: globalStyle.vertPadding,
                        }}
                    >
                        {title}
                    </Text>
                    <View style={style().divider}/>
                </Fragment>
            )
        } else if (title === 'Symbols' && auto[1].data.length !== 0) {
            return (
                <Fragment>
                    <Text 
                        style={{
                            ...style().title,
                            color: globalStyle.color.white,
                            paddingLeft: globalStyle.elPadding,
                            paddingRight: globalStyle.elPadding,
                            paddingTop: globalStyle.vertPadding,
                            paddingBottom: globalStyle.vertPadding,
                        }}
                    >
                        {title}
                    </Text>
                    <View style={style().divider}/>
                </Fragment>
            )
        } else {
            return (
                <Fragment/>
            )
        }
    }

    const symbolPressed = (symbol, watchlist) => {
        props.addToWatchlist(symbol, watchlist)
        props.toggle()
    }

    const watchlistPressed = async (symbol) => {
        console.log('asdf')
        props.setActiveSymbol(symbol)
        props.toggle()
    }

    return (
        <Fragment>
            {!noResults
                ?
                    <SectionList
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                        sections={auto}
                        stickySectionHeadersEnabled={false}
                        keyExtractor={(item, index) => item + index}
                        ListEmptyComponent={() => <Fragment style={{display: 'none'}}/>
                        }
                        ItemSeparatorComponent={
                            () => <ItemSeperator/>
                        }
                        renderSectionFooter={
                            () => (
                                    <View
                                    style={{
                                        padding: 10
                                    }}
                                />
                            )
                        }

                        renderItem={
                            ({ item, section: { title }}) => 
                                <Stock item={item} title={title}/>
                        }
                        renderSectionHeader={({ section: { title } }) => (
                            <SectionHeader title={title}/>
                        )}
                    />
                : 
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: -50,
                            padding: globalStyle.padding
                        }}
                    >
                        <Text
                            style={{
                                color: globalStyle.color.elMedium
                            }}
                        >
                            {`No results for "${props.searchInput}"`}
                        </Text>
                    </View>
            }
        </Fragment>

    )
}

const mapStateToProps = state => ({
    allStocks: state.allStocks,
    watchlist: state.watchlist.watchlist
})

export default connect(mapStateToProps, {
    addToWatchlist,
    setActiveSymbol
})(AutoComplete)