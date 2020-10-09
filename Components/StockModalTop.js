import React from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from 'react-redux'

import {style, globalStyle} from '../style'

const StockModalTop = props => {

    const currentPrice = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.latestPrice.toFixed(2)
        : null

    const currentChange = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.change > 0
            ? `+${(props.quote[props.activeSymbol].quote.changePercent * 100).toFixed(2)}%`
            : `${(props.quote[props.activeSymbol].quote.changePercent *100).toFixed(2)}%`
        : null

    const currentPos = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.changePercent > 0
            ? true
            : false
        : false

    const afterPrice = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.extendedPrice !== null
            ? props.quote[props.activeSymbol].quote.extendedPrice.toFixed(2)
            : null
        : null

    const afterChange = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.extendedChangePercent > 0
            ? `+${(props.quote[props.activeSymbol].quote.extendedChangePercent * 100).toFixed(2)}%`
            : `${(props.quote[props.activeSymbol].quote.extendedChangePercent *100).toFixed(2)}%`
        : null

    const afterPos = props.quote[props.activeSymbol] !== undefined 
        ? props.quote[props.activeSymbol].quote.extendedChangePercent > 0
            ? true
            : false
        : false

    return (
        <View
            style={{
                paddingHorizontal: globalStyle.elPadding,
                paddingVertical: 10
            }}
        >
            {
                props.isOpen
                    ?
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    color: globalStyle.color.white,
                                    fontWeight: '900'
                                }}
                            >
                                {currentPrice}
                            </Text>

                            <Text
                                style={{
                                    color: currentPos ? globalStyle.color.green : globalStyle.color.red,
                                    fontSize: 12,
                                    marginLeft: 10,
                                    fontWeight: '600'
                                }}
                            >
                                {currentChange}
                            </Text>
                        </View>
                    :
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: globalStyle.color.white,
                                            fontWeight: '900'
                                        }}
                                    >
                                        {currentPrice}
                                    </Text>

                                    <Text
                                        style={{
                                            color: currentPos ? globalStyle.color.green : globalStyle.color.red,
                                            fontSize: 12,
                                            marginLeft: 10,
                                            fontWeight: '600'
                                        }}
                                    >
                                        {currentChange}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color: globalStyle.color.elLight,
                                            fontWeight: '600'
                                        }}
                                    >
                                        At Close
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    width: 1,
                                    height: '100%',
                                    backgroundColor: globalStyle.color.elMedium,
                                    marginLeft: 10,
                                    marginRight: 10
                                }}
                            />

                            <View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: globalStyle.color.white,
                                            fontWeight: '900'
                                        }}
                                    >
                                        {afterPrice}
                                    </Text>

                                    <Text
                                        style={{
                                            color: afterPos ? globalStyle.color.green : globalStyle.color.red,
                                            fontSize: 12,
                                            marginLeft: 10,
                                            fontWeight: '600'
                                        }}
                                    >
                                        {afterChange}
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={{
                                            color: globalStyle.color.elLight,
                                            fontWeight: '600'
                                        }}
                                    >
                                        After Hours
                                    </Text>
                                </View>
                            </View>

                        </View>
            }
        </View>
    )
}

const mapStateToProps = state => ({
    quote: state.stockData.quote,
    isOpen: state.marketOpen.isOpen,
    activeSymbol: state.watchlist.activeSymbol
})

export default connect(mapStateToProps, {
    
})(StockModalTop)