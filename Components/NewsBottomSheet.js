import React, {useRef, useEffect, useState} from 'react'
import {
    View,
    Text,
    Dimensions,
    Platform, 
    Animated
} from 'react-native';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


//Packages
import BottomSheet from 'reanimated-bottom-sheet';

//Actions

//Style
import {
    style,
    globalStyle
} from '../style';
import {animate} from '../animate'

//Components
import News from '../Components/News'


const NewsBottomSheet = props => {
    const insets = useSafeAreaInsets();

    //Bottom Sheet
    const sheetRef = useRef(null)

    const sheetHeader = () => (
        <Animated.View 
            style={{
                height: globalStyle.newsModalTop,
                backgroundColor: globalStyle.color.elDark,
                width: '100%',
                borderTopLeftRadius: globalStyle.modalRadius,
                borderTopRightRadius: globalStyle.modalRadius,
                paddingLeft: globalStyle.elPadding,
                paddingRight: globalStyle.elPadding,
                transform: [{translateY: headerAnim}]
            }}
        >
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 15
                }}
            >
                <View
                    style={{
                        width: '5%',
                        minWidth: 40,
                        height: 5,
                        marginBottom: 2,
                        backgroundColor: globalStyle.color.elMedium,
                        borderRadius: 20
                    }}
                />
            </View>

            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <Animated.View

                >
                    <Text 
                        style={{
                            ...style().title,
                            color: globalStyle.color.white
                        }}
                    >
                        Business News
                    </Text>
                    <Text 
                        style={{
                            color: globalStyle.color.elLight,
                            paddingTop: 5,
                            fontWeight: '500',
                        }}
                    >
                        From iexCloud
                    </Text>
                </Animated.View>
            </View>
            <View
                style={{
                    borderBottomWidth: .5,
                    borderBottomColor: globalStyle.color.elMedium,
                }}
            />
        </Animated.View>
    )

    //Sheet Snap Points
    const topSnap = Dimensions.get('window').height - insets.top - globalStyle.headerHeight
    const midSnap = Dimensions.get('window').height/2.25
    const botSnap = insets.bottom + globalStyle.footerHeight + globalStyle.newsModalTop

    const [headerAnim] = useState(new Animated.Value(0))

    //Hide sheet
    const hideSheet = () => {
        sheetRef.current.snapTo(2)
        animate(
            headerAnim,
            100,
            100
        )
    }

    //Show Sheet
    const showSheet = () => {
        sheetRef.current.snapTo(2)
        animate(
            headerAnim,
            0,
            100
        )
    }

    useEffect(() => {
        if (props.edit || props.searchFocus) {
            hideSheet()
        } else {
            showSheet()
        }
    }, [props.edit, props.searchFocus])

    useEffect(() => {
        if(props.activeSymbol === null) {
            return showSheet()
        } else {
            return hideSheet()
        }
    }, [props.activeSymbol])

    useEffect(() => {
        if(!props.stockModal) {
            return showSheet()
        } else {
            return hideSheet()
        } 
    }, [props.stockModal])



    const closeEnd = () => {
        props.setModalBottom(true)
    }

    const openStart = () => {
        props.setModalBottom(false)
        props.setModalTop(false)
    }

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={[
                topSnap,
                midSnap,
                botSnap,
            ]}
            initialSnap={[1]}
            renderContent={() => 
                <News 
                    modalBottom={props.modalBottom}
                />
            }
            onOpenEnd={() => props.setModalTop(true)}
            onOpenStart={() => openStart()}
            onCloseStart={() => props.setModalTop(false)}
            onCloseEnd={() => closeEnd()}
            renderHeader={sheetHeader}
            enabledBottomClamp={false}
        />
    )
}

const mapStateToProps = state => ({
    activeSymbol: state.watchlist.activeSymbol
})

export default connect(mapStateToProps,{

})(NewsBottomSheet)