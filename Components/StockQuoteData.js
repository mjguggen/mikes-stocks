import React, {Fragment} from 'react'
import { 
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'

//Style
import { globalStyle, style } from '../style'

const StockQuoteData = props => {
    const data = props.quote[props.activeSymbol] === undefined 
        ? {}
        : props.quote[props.activeSymbol].quote

    const localStyle = StyleSheet.create({
        flexSpread: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            width: 150,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 3,
            paddingBottom: 3,
        },
        vertDivider: {
            width: .5,
            height: '100%',
            backgroundColor: globalStyle.color.elMedium,

        },
        num: {
            color: globalStyle.color.white,
            fontSize: 11,
        },
        cat: {
            color: globalStyle.color.elMedium,
            fontSize: 11,
        }
    })

    const convertNum = (num) => {
        return Math.abs(Number(num)) >= 1.0e+12
        ? Math.round(Math.abs(Number(num)) / 1.0e+12 *10 )/10 + "T"
        : Math.abs(Number(num)) >= 1.0e+9
        ? Math.round(Math.abs(Number(num)) / 1.0e+9 *10 )/10 + "B"
        : Math.abs(Number(num)) >= 1.0e+6
        ? Math.round(Math.abs(Number(num)) / 1.0e+6 * 10)/10 + "M"
        : Math.abs(Number(num)) >= 1.0e+3
        ? Math.round(Math.abs(Number(num)) / 1.0e+3 *10)/10 + "K"
        : Math.abs(Number(num));
    }

    return (
        <View>
            {data !== null
                ?
                    <ScrollView
                        style={{
                            width: '100%',
                            paddingVertical: 10,
                        }}
                        contentContainerStyle={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            //width: '100%',
                        }}

                        horizontal={true}
                        propagateSwipe={true}
                        showsHorizontalScrollIndicator={false}
                    >

                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Open 
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.open === null ? "-" : data.open} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    High
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.high} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Low
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.low} 
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={localStyle.vertDivider}/>

                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Vol
                                </Text>
                                <Text style={localStyle.num}> 
                                    {convertNum(data.volume)} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    P/E
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.peRatio} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Mkt Cap
                                </Text>
                                <Text style={localStyle.num}> 
                                    {convertNum(data.marketCap)} 
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={localStyle.vertDivider}/>

                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    52W H
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.week52High} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    52W L
                                </Text>
                                <Text style={localStyle.num}> 
                                    {data.week52Low} 
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Avg Vol
                                </Text>
                                <Text style={localStyle.num}> 
                                    {convertNum(data.avgTotalVolume)} 
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={localStyle.vertDivider}/>

                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Yield
                                </Text>
                                <Text style={localStyle.num}> 
                                    -
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    Beta
                                </Text>
                                <Text style={localStyle.num}> 
                                    -
                                </Text>
                            </View>

                            <View style={localStyle.flexSpread}>
                                <Text style={localStyle.cat}> 
                                    EPS
                                </Text>
                                <Text style={localStyle.num}> 
                                    -
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                : 
                    null
            }
        </View>

    )
}

const mapStateToProps = state => ({
    quote: state.stockData.quote,
    activeSymbol: state.watchlist.activeSymbol
})

export default connect(mapStateToProps, {

}) (StockQuoteData)