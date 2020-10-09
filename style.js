import { 
    StyleSheet, 
    Platform, 
    StatusBar,
} from 'react-native'

export const globalStyle = {
    elPadding: 20,
    vertPadding: 10,
    borderRadius: 5,
    color: {
        black: 'rgb(0, 0, 0)',
        white: 'rgb(255, 255, 255)',
        elDark: '#222222',
        elMedium: '#545454',
        elLight: 'rgb(153, 153, 153)',
        blue: '#11a1f4',
        green: 'rgb(63, 204, 138)',
        red: 'rgb(255, 94, 40)'
    },
    footerHeight: 40,
    headerHeight: 60,
    newsModalTop: 90,
    modalRadius: 10,
}

export const style = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: globalStyle.color.black,
    },
    safeArea: {
        height: '100%',
        width: '100%',
        paddingTop: Platform.OS === 'android' ? StatusBar.height : 0,
    },
    elementContainer: {
        paddingLeft: globalStyle.elPadding,
        paddingRight: globalStyle.elPadding,
        width: '100%',
    },
    searchContainerWrap: {
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchInputContainer: {
        width: '100%',
        height: '100%',
        flexShrink: 1,
        backgroundColor: globalStyle.color.elDark,
        borderRadius: globalStyle.borderRadius,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchInput: {
        flexGrow: 1,
    },
    header: {
        width: '100%',
        zIndex: 5
    },
    footer: {
        width: '100%',
        backgroundColor: globalStyle.color.elDark,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: globalStyle.elPadding,
        paddingRight: globalStyle.elPadding,
        borderTopColor: globalStyle.color.elMedium,
        borderTopWidth: .25,
        zIndex: 100,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        margin: 0,
        padding: 0,
    },
    btn: {
        color: globalStyle.color.blue
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: globalStyle.color.elDark
    },
    watchlistElement: {
        width: '100%',
        height: 75,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    symbol: {
        color: globalStyle.color.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    companyName: {
        paddingTop: 5,
        color: globalStyle.color.elLight
    },
    price: {
        color: globalStyle.color.white,
        fontSize: 12,
        marginLeft: 'auto',
        fontWeight: '600'
    },
    priceChange: {
        fontWeight: '600'
    },
    draggableBtn: {
        height: 12,
        width: 20,
        justifyContent: 'space-between',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    draggableBar: {
        backgroundColor: globalStyle.color.elMedium,
        width: '100%',
        height: 2,
    }
})