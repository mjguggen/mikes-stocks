import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

//Actions
import {getAllStocks} from '../redux/actions/allStocks'

//Style
import {
    style,
    globalStyle
} from '../style'
import {animate} from '../animate'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Footer = props => {
    const insets = useSafeAreaInsets()

    const [fade] = useState(new Animated.Value(0))

    useEffect(() => {
        props.edit ? animate(
            fade, 1, 200
        ) : animate (
            fade, 0, 200
        )
    }, [props.edit])

    return (
        <View 
            style={{
                ...style().footer,
                height: insets.bottom + 40,
                paddingBottom: insets.bottom,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10000
            }}
        >
            <TouchableOpacity onPress={() => props.getAllStocks()}>
                <Text 
                    style={{
                        color: globalStyle.color.elMedium,
                        fontWeight: 'bold'
                    }}
                >
                    CREATED BY MIKE GUGGENBUEHL
                </Text>
            </TouchableOpacity>


            <Animated.View
                style={{
                    opacity: fade
                }}
            >
                <TouchableOpacity
                    onPress={() => props.setSearchFocus(true)}
                >
                    <Icon
                        color={globalStyle.color.elMedium}
                        size={25}
                        name="plus-circle"
                    />
                </TouchableOpacity>  
            </Animated.View>

        </View>

    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    getAllStocks
})(Footer)