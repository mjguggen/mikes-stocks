import React from 'react'
import { 
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from 'react-native'
import {connect} from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Style
import { globalStyle, style } from '../style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Actions
import { resetNewsLink, hideModal } from '../redux/actions/news'

//Packages
import Modal from 'react-native-modal'
import { WebView } from 'react-native-webview';

const NewsBrowser = props => {
    const insets = useSafeAreaInsets()

    const hide = async () => {
        props.navigation.navigate("Home")
        props.resetNewsLink()
    }

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
        ? Dimensions.get("window").height
        : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

    return (
        <SafeAreaView 
            style={{
                ...style().safeArea,
                backgroundColor: globalStyle.color.black,
            }}
        >
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 'auto',
                    marginTop: 'auto',
                    overflow: 'hidden',
                    backgroundColor: globalStyle.color.black,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: globalStyle.elPadding.black,
                        paddingLeft: globalStyle.elPadding,
                        paddingRight: globalStyle.elPadding,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>  hide()}
                        style={{
                            zIndex: 10
                        }}
                    >
                        <Icon
                            name="chevron-left"
                            color="white"
                            size={35}
                        />
                    </TouchableOpacity>

                    <Text
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            color: globalStyle.color.white,
                            fontWeight: 'bold',
                            zIndex: 0
                        }}
                    >
                        {props.source}
                    </Text>
                </View>
                {props.link !== null
                    ? 
                        <WebView
                            source={{ uri: props.link}}
                            useWebKit='true'
                            startInLoadingState={true}
                            allowsBackForwardNavigationGestures
                            style={{
                                flex: 1,
                            }}
                            containerStyle={{
                                backgroundColor: globalStyle.color.black
                            }}
                        />
                    : 
                        null
                }

            </View>
        </SafeAreaView>
        
    )
}

const mapStateToProps = state => ({
    modal: state.news.modal,
    link: state.news.link,
    source: state.news.source,
})

export default connect(mapStateToProps, {
    resetNewsLink, 
    hideModal
})(NewsBrowser)