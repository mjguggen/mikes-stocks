import React, {useEffect, useState, Fragment} from 'react'
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    Platform,
    Easing
} from 'react-native'
import {connect} from 'react-redux'

//Actions

//Style
import {
    style,
    globalStyle
} from '../style'

//Packages
import {format} from 'date-fns'


//Components
import TickerTape from './TickerTape'

const Header = props => {
    const date = format(new Date(), "MMMM d")

    const [headerAnim] = useState(new Animated.Value(0))

    useEffect(() => {
        props.searchFocus ?
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false
            }).start()
        :
            Animated.timing(headerAnim, {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false
            }).start()
    }, [props.searchFocus])

    const headerInterpolation = headerAnim.interpolate({inputRange: [0, 1], outputRange: [globalStyle.headerHeight, 0]})

    const toggle = () => {
        props.edit ? props.setEdit(false) : props.setEdit(true)
    }

    const [animHeader] = useState(new Animated.Value(0))

    const startHeaderAnim = () => {
        Animated.timing(
            animHeader,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: Platform.OS === 'ios' ? true : false
            }
        ).start()
    }

    useEffect(() => {
        if (!props.modalTop && !props.stockModalTop) {
            return startHeaderAnim()
        } else {
            animHeader.setValue(0)
        }
    }, [props.modalTop, props.stockModalTop])

    useEffect(() => {
        if (!props.searchFocus) {
            animHeader.setValue(1)
        } else {
            animHeader.setValue(0)
        }
    }, [props.searchFocus])

    return (
        <Animated.View 
            style={{
                ...style().header,
                height: headerInterpolation
            }}
        >
            {!props.modalTop && !props.stockModalTop ?
                <View style={style().elementContainer}>
                    {!props.searchFocus ? 
                        <Animated.View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                opacity: animHeader
                            }}
                        >
                            <View>
                                <Text style={{
                                    ...style().title,
                                    color: globalStyle.color.white
                                }}>
                                    Stocks
                                </Text>
                                <Text style={{
                                    ...style().title,
                                    color: globalStyle.color.elLight
                                }}>                    
                                    {date}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <TouchableOpacity 
                                    style={{
                                        alignItems: "flex-end",
                                        marginTop: 10
                                    }}
                                    onPress={() => toggle()}
                                >
                                    <Text style={style().btn}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                        : null
                    }
                </View>
            :
                <TickerTape/>
            }
        </Animated.View>
    )
}

const mapStateToProps = state => ({
    activeSymbol: state.watchlist.activeSymbol
})

export default connect(mapStateToProps,{

})(Header)