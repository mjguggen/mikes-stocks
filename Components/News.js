import React, {useEffect, useRef, useState} from 'react'
import { 
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import {connect} from 'react-redux'

//Style
import { globalStyle, style } from '../style'

//Packages
import { formatDistanceToNow } from 'date-fns'

//Actions
import { setNewsLink, showModal } from '../redux/actions/news'

const News = props => {
    const data = () => {
        if (props.stockModal) {
            return props.news.filter(i => i.related === props.activeSymbol)
        } else {
            return props.news
        }
    }

    const itemHeight = 150
    const padding = 10

    const newsRef = useRef()

    const linkPressed = (link, source) => {
        console.log('yes')
        props.setNewsLink(link, source)
        props.showModal()
    }

    useEffect(() => {
        if (props.modalBottom) {
            newsRef.current.scrollToIndex({
                index: 0
            })
        }
    }, [props.modalBottom])

    const Item = ({item}) => {
        return (
            <TouchableOpacity
                style={{
                    height: itemHeight,
                    paddingTop: padding,
                    paddingBottom: padding,
                    display: 'flex',
                    flexDirection: 'row',
                }}
                activeOpacity={1}
                onPress={() => linkPressed(item.url, item.source)}
            >
                <View
                    style={{
                        flex: 1,
                        paddingRight: 20,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <View>
                        <Text
                            style={{
                                color: globalStyle.color.white,
                                fontWeight: "900",
                                fontSize: 16,
                                paddingBottom: 5,
                                overflow: 'hidden',
                                height: 25,
                            }}
                        >
                            {item.source.toUpperCase()}
                        </Text>
                        <Text
                            style={{
                                color: globalStyle.color.white,
                                fontWeight: 'bold',
                                overflow: 'hidden',
                                flexGrow: 1,
                                maxHeight: 100
                                
                            }}
                        >
                            {item.headline}
                        </Text>
                        
                    </View>
                    <View>
                        <Text
                            style={{
                                color: globalStyle.color.elLight,
                                fontSize: 8
                            }}
                        >
                            {formatDistanceToNow(
                                item.datetime,
                                {addSuffix: true}
                            )}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        height: itemHeight - (padding*2),
                        width: itemHeight - (padding*2),
                        overflow: 'hidden',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",

                    }}
                >
                    <Image
                        source={{url: item.image}}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            ref={newsRef}
            data={data()}
            renderItem={({item}) => <Item item={item}/>}
            keyExtractor={(item, index) => `key-${index}`}
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: globalStyle.color.elDark,
                padding: globalStyle.elPadding
            }}
        />
    )
}

const mapStateToProps = state => ({
    news: state.stockData.news,
    activeSymbol: state.watchlist.activeSymbol
})

export default connect(mapStateToProps, {
    setNewsLink, 
    showModal
}) (News)