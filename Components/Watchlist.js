import React, {useState, useEffect, useRef, Fragment} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    TouchableHighlight,
    Platform,
    Animated,
    StyleSheet,
    I18nManager,
    UIManager,
    LayoutAnimation,
    FlatList
} from 'react-native'
import {connect} from 'react-redux'
import DraggableFlatList from "react-native-draggable-flatlist";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

//Actions
import { 
    setActiveSymbol,
    removeFromWatchlist,
    removeActiveSymbol,
    moveWatchlist
} from '../redux/actions/watchlist'
import {
    getIntraDay,
    getQuote,
    removeStockData
} from '../redux/actions/stockData'

//Style
import {
    style,
    globalStyle
} from '../style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Components
import Overlay from '../Components/Overlay'
import AutoComplete from '../Components/AutoComplete'
import IntraDayChart from '../Components/IntradayChart'

const Watchlist = props => {
    
    //get previous value
    function usePrevious(value) {
        const ref = useRef();
        
        useEffect(() => {
            ref.current = value;
        }, [value]);
        
        return ref.current;
    }

    //change types
    const [changeType, setChangeType] = useState("changePercent")
    const change = () => {
        if (changeType === "changePercent") {
            return (
                setChangeType("change")
            )
        } else if (changeType === "change") {
            return (
                setChangeType("marketCap")
            )
        } else if (changeType === "marketCap") {
            return (
                setChangeType("changePercent")
            )
        }
    }

    //convert numbers to text
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

    //convert stockdata object to array
    const listArr = (data) => {
        const arr = []

        Object.values(data).map(i => {
            arr.push(
                i.quote
            )
        })

        return arr
    }

    //item seperator component
    const ItemSeperator = () => (
        <View
            style={{
                ...style().divider,
                marginLeft: globalStyle.elPadding
            }}
        />
    )

    //fade in animation
    const [fade] = useState(new Animated.Value(0))

    const editAnimIn = () => {
        Animated.timing(
            fade,
            {   
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }
        ).start()
    }

    const editAnimOut = () => {
        Animated.timing(
            fade,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }
        ).start()
    }

    useEffect(() => {
        !props.edit ? editAnimOut() : editAnimIn()
    }, [props.edit])

    const fadeStartOn = fade.interpolate({inputRange:[0,1],outputRange:[1, 0]})
    const fadeStartOff = fade.interpolate({inputRange:[0,1],outputRange:[0, 1]})
    const slideRight = fade.interpolate({inputRange:[0,1],outputRange:[50, 0]})
    const slideLeft = fade.interpolate({inputRange:[0,1],outputRange:[-50, 0]})
    const animWidth = fade.interpolate({inputRange:[0,1],outputRange:[160, 50]})
    const leftWidth = fade.interpolate({inputRange:[0,1],outputRange:[0, 30]})
      
    const [dAnim] = useState(new Animated.Value(75))

    const renderRightActions = (progress, dragX) => {
        const slideIn = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [0, 80],
            extrapolate: 'clamp',
        });

        if (progress === 1) {
            Animated.timing(dAnim,
                {
                    toValue: 0,
                    duration: 1,
                    useNativeDriver: Platform.OS === 'ios' ? true : false
                }
            ).start()
        }

        return (
            <RectButton 
                style={{
                    ...localStyle.rightAction
                }}
            >
                <Animated.Text
                    style={{
                        color: 'white',
                        padding: 10,
                        transform: [{translateX: slideIn}]
                    }}
                >
                    Remove
                </Animated.Text>
            </RectButton>

        );
    };

    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const rowRef = useRef(null)

    const Row = ({item, index, drag}) => {
        return (
            <Swipeable
                ref={rowRef}
                friction={2}
                rightThreshold={150}
                renderRightActions={renderRightActions}
                onSwipeableRightOpen={() => 
                    deleteRow(index)
                }
            >
                <Item item={item} drag={drag} index={index}/>
            </Swipeable>       
        )
    }

    const deleteRow = async (index) => {        
        props.removeFromWatchlist(index, props.watchlist)
        props.removeStockData(
            props.watchlist[index], 
            props.intraDay, 
            props.quote,
            props.news
        )
    }

    const Item = ({item, index, drag}) => {
        return (
            <TouchableHighlight
                style={{
                    zIndex:1
                }}
                underlayColor={globalStyle.color.elMedium}
                activeOpacity={.8}
                
                onPress={() => props.setActiveSymbol(item.symbol)}
            >

                <View
                    style={{
                        ...style().watchlistElement,
                        paddingLeft: globalStyle.elPadding,
                        paddingRight: globalStyle.elPadding,
                        flex: 1,
                        backgroundColor: globalStyle.color.black,
                        zIndex: 1, 
                    }}
                >

                    <Animated.View
                        style={{
                            width: leftWidth,
                            opacity: fadeStartOff,
                            transform: [{translateX: slideLeft}]
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => deleteRow(index, item.symbol)}
                        >
                            <Icon
                                name="minus-circle"
                                color={globalStyle.color.red}
                                size={20}
                            />
                        </TouchableOpacity>

                    </Animated.View>
                    <View
                        style={{
                            overflow: 'hidden',
                            flex: 1,
                        }}
                    >
                        <Text style={style().symbol}>
                            {item.symbol}
                        </Text>
                        <View
                            style={{
                                width: '100%',
                                overflow: 'hidden',
                                height: 20,
                            }}
                        >
                            <Text style={style().companyName}>
                                {item.companyName}
                            </Text>
                        </View>

                    </View>
                    <Animated.View
                        style={{
                            width: animWidth,
                            height: '100%',
                        }}
                    >
                        <Animated.View
                            style={{
                                width: 75,
                                height: '60%',
                                marginLeft: 15,
                                marginRight: 15,
                                position: 'absolute',
                                left: 0,
                                top: 15,
                                opacity: fadeStartOn,

                            }}
                        >
                            <IntraDayChart
                                item={item}
                            />
                        </Animated.View>
            
                        <Animated.View 
                            style={{
                                width: 55, 
                                marginRight: globalStyle.elPadding,
                                position: 'absolute',
                                opacity: fadeStartOn,
                                left: 105,
                                top: 7,
                                zIndex: 5
                            }}
                        >
                            <Text style={style().price}>
                                {item.latestPrice.toFixed(2)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => change()}
                                style={{
                                    backgroundColor: item.change < 0 
                                        ? globalStyle.color.red 
                                        : globalStyle.color.green,
                                    borderRadius: 5,
                                    marginTop: 5,
                                    fontWeight: '500'
                                }}
                                activeOpacity={1}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 10,
                                        marginLeft: 'auto',
                                        paddingVertical: 4,
                                        paddingHorizontal: 5
                                    }}
                                >
                                    {
                                        changeType === 'changePercent'
                                            ? `${item.change > 0 ? '+' : ''}${(item[changeType]*100).toFixed(2)}%`
                                            : changeType === 'marketCap'
                                                ? convertNum(item[changeType])
                                                : `${item.change > 0 ? '+' : ''}${item[changeType].toFixed(2)}`
                                    }
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <TouchableOpacity
                            style={{
                                height: '100%',
                                width: 50,
                                position: 'absolute',
                                right: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                //zIndex: 100000
                            }}
                            pointerEvents={props.edit ? 'auto' : 'box-none'}
                            activeOpacity={1}
                            onLongPress={drag}
                        >
                            <Animated.View
                                style={{
                                    ...style().draggableBtn,
                                    opacity: fadeStartOff,
                                    transform: [{translateX: slideRight}]
                                }}
                                pointerEvents={props.edit ? 'auto' : 'none'}
                            >
                                <View style={style().draggableBar}/>
                                <View style={style().draggableBar}/>
                                <View style={style().draggableBar}/>
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </TouchableHighlight>
        )
    }

    const localStyle = StyleSheet.create({
        rightAction: {
            alignItems: 'center',
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            backgroundColor: globalStyle.color.red,
            flex: 1,
            justifyContent: 'flex-end'
          }
    })

    return (
        <SafeAreaView
            style={{
                flexGrow: 1,
            }}
        >
            { props.searchFocus && props.searchInput === ''
                ? 
                    <Overlay
                        setSearchFocus={props.setSearchFocus}
                    />
                :
                    null
            }

            { props.searchInput === ''
                ? 
                    <Fragment>
                        {props.watchlist.length > 0
                            ?
                                <FlatList
                                    data={listArr(props.quote)}
                                    keyExtractor={(item) => item.symbol}
                                    renderItem={({ item, index, drag }) => (
                                        <Row
                                            item={item} 
                                            index={index}
                                            drag={drag}
                                        />
                                    )}
                                    ItemSeparatorComponent={() => <ItemSeperator/>}
                                    style={{
                                        width: '100%',
                                    }}
                                    //onDragEnd={({ data }) => props.moveWatchlist(data.map(i => i.symbol))}
                                />
                            : 
                                null
                        }
                    </Fragment>

                :
                    <AutoComplete
                        searchFocus={props.searchFocus}
                        setSearchFocus={props.setSearchFocus}
                        searchInput={props.searchInput}
                        toggle={props.toggle}
                        setSearchFocus={props.setSearchFocus}
                    />
            }
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    intraDay: state.stockData.intraDay,
    quote: state.stockData.quote,
    watchlist: state.watchlist.watchlist,
    news: state.stockData.news
})

export default connect(mapStateToProps,{
    setActiveSymbol,
    getIntraDay,
    getQuote,
    moveWatchlist,
    removeFromWatchlist,
    removeStockData
})(Watchlist)

