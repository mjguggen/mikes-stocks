import React, {useEffect, useState, Fragment, useRef} from 'react'
import { 
    Platform,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {connect} from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Packages
import BottomSheet from 'reanimated-bottom-sheet';

//Components
import StockModalTop from './StockModalTop'
import StockChart from './StockChart'
import StockQuoteData from './StockQuoteData'
import News from './News'

//Style
import { globalStyle, style } from '../style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Actions
import { removeActiveSymbol } from '../redux/actions/watchlist'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const StockModal = props => {
    const insets = useSafeAreaInsets()

    const sheetRef = useRef(null)

    useEffect(() => {
        if(props.activeSymbol !== null) {
            return show()
        } else {
            return hide()
        }
    }, [props.activeSymbol])

    const show = () => {
        props.setStockModal(true)
        sheetRef.current.snapTo(0)
    }

    const hide = () => {
        sheetRef.current.snapTo(1)
        props.removeActiveSymbol()
        props.setStockModal(false)
        props.setStockModalTop(false)
    }

    const topSnap = Dimensions.get('window').height - insets.top - globalStyle.headerHeight
    const botSnap = 0

    const renderContent = () => (
        <ScrollView
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: globalStyle.color.elDark,
               
            }}
            contentContainerStyle={{
                marginBottom: insets.bottom + globalStyle.footerHeight,
                paddingBottom: insets.bottom + globalStyle.footerHeight,
            }}
        >
            {props.activeSymbol === null
                ?
                    null
                : 
                    <Fragment>
                        <StockModalTop/>
                        <StockChart/>
                        <StockQuoteData/>
                        <News stockModal={true}/>
                    </Fragment>
            }
        </ScrollView>
    )

    const sheetHeader = () => (
        <Fragment>
            {props.activeSymbol !== null
                ?
                    <View 
                        style={{
                            height: 70,
                            backgroundColor: globalStyle.color.elDark,
                            width: '100%',
                            borderTopLeftRadius: globalStyle.modalRadius,
                            borderTopRightRadius: globalStyle.modalRadius,
                            overflow: 'hidden',
                        }}
                    >
                        <View
                            style={{
                                padding: globalStyle.elPadding,
                                width: '100%',
                                paddingBottom: 0,
                                
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Text
                                    style={{
                                        ...style().title,
                                        color: globalStyle.color.white,
                                        marginRight: 10,
                                    }}
                                >
                                    {
                                        props.activeSymbol
                                    }
                                </Text>
                                <Text
                                    style={{
                                        color: globalStyle.color.elMedium,
                                        fontSize: 12,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {
                                        props.quote[props.activeSymbol].quote.companyName
                                    }
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        marginLeft: 'auto',
                                        marginBottom: 'auto',
                                    }}
                                    onPress={() => hide()}
                                >
                                    <Icon
                                        name="close-circle"
                                        color={globalStyle.color.elMedium}
                                        size={30}
                                        style={{
                                            zIndex: 5
                                        }}
                                    />
                                    <View
                                        style={{
                                            height: 20,
                                            width: 20,
                                            backgroundColor: globalStyle.color.elLight,
                                            position: 'absolute',
                                            borderRadius: '25%',
                                            top: 5,
                                            left: 5,
                                            zIndex: 4,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                paddingHorizontal: globalStyle.elPadding,
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                            }}
                        >
                            <View 
                                style={{
                                    ...style().divider,
                                    backgroundColor: globalStyle.color.elMedium,

                                }}
                            />
                        </View>

                    </View>
                :
                    null
            }
        </Fragment>
    )

    return (
        <BottomSheet
            ref={sheetRef}
            initialSnap={[1]}
            snapPoints={[
                topSnap,
                botSnap
            ]}
            onOpenEnd={() => props.setStockModalTop(true)}
            onCloseStart={() => props.setStockModalTop(false)}
            onCloseEnd={() => hide()}
            renderHeader={sheetHeader}
            renderContent={renderContent}
            style={{
                marginBottom: insets.bottom + globalStyle.footerHeight,
                paddingBottom: insets.bottom + globalStyle.footerHeight,
                borderTopLeftRadius: globalStyle.modalRadius,
                borderTopRightRadius: globalStyle.modalRadius,
                overflow: 'hidden'
            }}
        />
    )
}

const mapStateToProps = state => ({
    activeSymbol: state.watchlist.activeSymbol,
    quote: state.stockData.quote
})

export default connect(mapStateToProps, {
    removeActiveSymbol
})(StockModal)