import React, {useEffect, useState, useRef} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Animated,
    Dimensions,
    Easing, Platform
} from 'react-native'
import {connect} from 'react-redux'

//Actions

//Style
import {
    style,
    globalStyle
} from '../style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SearchBar = props => {
    //Text Input ref
    const inputRef = useRef(null)

    //Focus Text Input
    const focus = () => {
        props.setSearchFocus(true)
    }

    //Blur Text Input
    const blur = () => {
        if (props.searchFocus && props.searchInput === '') {
            props.setSearchFocus(false)
            props.setSearchInput('')
        }
    }

    const setFocus = () => {
        props.setSearchFocus(true)
        inputRef.current.focus()
    }

    const setBlur = () => {
        props.setSearchInput('')
        inputRef.current.clear()
        inputRef.current.blur()
        blur()
    }

    //Blur Text Input from external control
    useEffect(() => {
        if (props.searchInput === '') {
            if (!props.searchFocus) {
                return (setBlur())
            } else {
                return (setFocus())
            }
        } else {
            return
        }
    }, [props.searchFocus])

    useEffect(() => {
        props.setSearchInput('')
        inputRef.current.clear()
        inputRef.current.blur()
        props.setSearchFocus(false)
        setBlur()
    }, [props.toggleBlur])

    //Animations
    const [searchAnim] = useState(new Animated.Value(0))

    useEffect(() => {
        if (props.searchFocus) {
            return (
                Animated.timing(searchAnim, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start()
            )
        } else {
            return (
                Animated.timing(searchAnim, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start()
            )
        }
    }, [props.searchFocus])

    const interpolateBar = searchAnim.interpolate({inputRange:[0,1],outputRange:[0,60]})
    const interpolateTextInput = searchAnim.interpolate({inputRange:[0,1],outputRange:[
        Dimensions.get('window').width - (globalStyle.elPadding * 2), 
        Dimensions.get('window').width - (globalStyle.elPadding * 2) - 60
    ]})

    return (
        <View 
            style={{
                ...style().elementContainer,
                paddingBottom: 10,
                zIndex: 5,
            }}
        >
            <View style={style().searchContainerWrap}>
                <Animated.View 
                    style={{
                        ...style().searchInputContainer,
                        width: interpolateTextInput
                    }}
                >
                    <Icon
                        name="magnify"
                        size={20}
                        color={globalStyle.color.elLight}
                        style={{
                            paddingLeft: 5,
                            paddingRight: 5
                        }}
                    />

                    <TextInput
                        ref={inputRef}
                        style={
                            style().searchInput
                        }
                        onFocus={() => focus()}
                        onBlur={() => blur()}
                        placeholder="Search"
                        placeholderTextColor={globalStyle.color.elLight}
                        color={globalStyle.color.white}
                        value={props.searchInput}
                        onChangeText={(e) => props.setSearchInput(e)}
                        autoCorrect={false}
                        
                    />
                    
                    <Icon
                        name="microphone"
                        size={20}
                        color={globalStyle.color.elLight}
                        style={{
                            paddingLeft: 5,
                            paddingRight: 5
                        }}
                    />
                </Animated.View>
 

                <Animated.View
                    style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        paddingRight: 5,
                        width: interpolateBar,
                        position: 'absolute',
                        right: 0,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setBlur()}
                    >
                        <Animated.Text 
                            style={{
                                ...style().btn,
                                transform: [{scale: searchAnim}]
                            }}
                        >
                            Cancel
                        </Animated.Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

})(SearchBar)