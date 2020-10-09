import React from 'react'
import {
    TouchableOpacity,
} from 'react-native'
import {connect} from 'react-redux'

//Actions


//Style
import {
    style,
    globalStyle
} from '../style'

const Overlay = props => {

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: globalStyle.color.black,
                opacity: .7,
                zIndex: 5,
            }}
            activeOpacity={.7}
            onPress={() => props.setSearchFocus(false)}
        />
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps,{

})(Overlay)