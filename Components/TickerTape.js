import React, {useState, useEffect} from 'react'
import {
    View,
    FlatList,
    Text,
    Animated,
    Platform,
    Easing, 
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'

//Packages
import IntraDayChart from '../Components/IntradayChart'

//Style
import { style, globalStyle } from '../style'

const TickerTape = props => {
    const [anim] = useState(new Animated.Value(0))

    const startAnim = () => {
        anim.setValue(.4)

        Animated.timing(
            anim,
            {
              toValue: 1,
              duration: props.watchlist.length*5500,
              easing: Easing.linear,
              useNativeDriver: Platform.OS === 'ios' ? true : false
            }
        ).start(() => startAnim2())
    }

    const startAnim2 = () => {
        anim.setValue(.4)

        Animated.timing(
            anim,
            {
              toValue: 1,
              duration: props.watchlist.length*6000,
              easing: Easing.linear,
              useNativeDriver: Platform.OS === 'ios' ? true : false
            }
        ).start(() => startAnim2())
    }

    useEffect(() => {
        startAnim()
    }, [])

    const [animOpacity] = useState(new Animated.Value(0))

    const startOpacity = () => {
        Animated.timing(
            animOpacity,
            {
                toValue: 1,
                duration: 200,
                useNativeDriver: Platform.OS === 'ios' ? true : false
            }
        ).start()
    }

    useEffect(() => {
        animOpacity.setValue(0)

        startOpacity()
    }, [])

    const listArr = (data) => {
        const arr = []

        Object.values(data).map(i => {
            arr.push(
                i.quote
            )
        })

        return arr
    }

    const tickerWidth = 150

    const interpolateAnim = anim.interpolate({inputRange:[0,1],outputRange:[
        (props.watchlist.length * tickerWidth), 
        (props.watchlist.length * -tickerWidth)
    ]})

    const renderItem = ({item}) => {
        return (
            <View
                style={{
                    height: '100%',
                    width: tickerWidth,
                    padding: 5,
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        height: '100%',
                        width: '50%',
                        justifyContent: 'space-around'
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {item.symbol}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: '900'
                        }}
                    >
                        {item.latestPrice.toFixed(2)}
                    </Text>
                    <Text
                        style={{
                            color: item.change > 0 ? globalStyle.color.green : globalStyle.color.red,
                        }}
                    >
                        {`${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`}
                    </Text>
                </View>

                <View
                    style={{
                        height: '90%',
                        width: '50%',
                        padding: 10
                    }}
                >
                    <IntraDayChart
                        item={item}
                    />
                </View>


            </View>
        )
    }

    return (
        <View
            style={{
                ...style().header,
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Animated.View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    transform: [{translateX: interpolateAnim}],
                    opacity: animOpacity,
                    position: 'absolute',
                }}
            >
                {/* 
                <FlatList
                    data={listArr(props.quote)}
                    keyExtractor={(item) => item.symbol}
                    horizontal={true}
                    renderItem={renderItem}
                    style={{
                        flex: 1,
                        width: props.watchlist.length*tickerWidth
                    }}
                    initialNumToRender={props.watchlist.length}
                />
                */}

                {
                    listArr(props.quote).map(i => renderItem({item: i}))
                }

            </Animated.View>
        </View>
    )
}

const mapStateToProps = state => ({
    watchlist: state.watchlist.watchlist,
    quote: state.stockData.quote
})

export default connect(mapStateToProps, {

})(TickerTape)