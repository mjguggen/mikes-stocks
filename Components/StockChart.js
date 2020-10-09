import React, {useState, useEffect, Fragment} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'

//Packages
import {AreaChart, XAxis, Grid} from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import * as shape from 'd3-shape'

//Style
import { style, globalStyle } from '../style'

//Actions
import {
    getChartData,
    resetChart
} from '../redux/actions/stockData'

const StockChart = props => {
    const [time, setTime] = useState({
        client: '1D',
        real: '1d'
    })

    const [loading, setLoading] = useState(true)

    const times = [
        {
            client: '1D',
            real: '1d'
        },
        {
            client: '1W',
            real: '5dm'
        },
        {
            client: '1M',
            real: '1mm'
        },
        {
            client: '3M',
            real: '3m'
        },
        {
            client: '6M',
            real: '6m'
        },
        {
            client: '1Y',
            real: '1y'
        },
        {
            client: '2Y',
            real: '2y'
        },
        {
            client: '5Y',
            real: '5Y'
        },
        {
            client: 'ALL',
            real: 'max'
        }
    ]

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [time])

    const getData = async () => {
        setLoading(true)

        await props.getChartData(props.activeSymbol, time.real)

        setLoading(false)
    }

    const posOrNeg = props.quote[props.activeSymbol] !== undefined
        ? props.quote[props.activeSymbol].quote.change > 0
            ? true
            : false
        : true
    
    const chartPriceArr = () => {
        const arr = props.chart.map(i => i.close)

        const arr2 = arr.filter(i => i !== null)

        return arr2
    }

    const chartTicks = () => {
        const chartArr = props.chart.map(i => i.close)
        const chartArr2 = chartArr.filter(i => i !== null)

        const min = Math.min(...chartArr2)
        const max = Math.max(...chartArr2)

        let arr = [0, 0, 0, 0]

        arr[3] = time.real === '1d' ? min.toFixed(2) : min.toFixed(0)
        arr[2] = time.real === '1d' 
            ? (((max - min)*.33) + min).toFixed(2) 
            : (((max - min)*.33) + min).toFixed(0)
        arr[1] = time.real === '1d' 
            ? (((max - min)*.66) + min).toFixed(2)
            : (((max - min)*.66) + min).toFixed(0)
        arr[0] = time.real === '1d' ? max.toFixed(2) : max.toFixed(0)

        return arr
    }

    const distance = () => {
        const amount = chartTicks()[3].split('').length

        return amount <= 4 
            ? 45
            : amount <= 5
                ? 56
                : amount <= 6
                    ? 60
                    : 70
    }

    const chartVolArr  = () => {
        const chartArr = props.chart.map(i => i.volume)
        const chartArr2 = chartArr.filter(i => i !== null)

        const max = Math.max(...chartArr2)
        const min = Math.min(...chartArr2)

        const avg = []


        if (chartArr2.length < 100) {
            chartArr2.map((i, index) => {
                avg.push(i)
            }) 
        } else if (chartArr2.length < 200) {
            chartArr2.map((i, index) => {
                if (i%2 === 0) {
                    avg.push((i + chartArr2[index +1])/2)
                }
            })
        } else if (chartArr2.length < 300) {
            chartArr2.map((i, index) => {
                if (i%3 === 0) {
                    avg.push((i + chartArr2[index -1] + chartArr2[index -2])/3)
                }
            }) 
        } else if (chartArr2.length < 400) {
            chartArr2.map((i, index) => {
                if (i%4=== 0) {
                    avg.push((i + chartArr2[index -1] + chartArr2[index -2] + chartArr2[index -3])/4)
                }
            }) 
        } else if (chartArr2.length < 500) {
            chartArr2.map((i, index) => {
                if (i%5 === 0) {
                    avg.push((i + chartArr2[index -1] + chartArr2[index -2] + chartArr2[index -3]+ chartArr2[index -4])/5)
                }
            })    
        } else if (chartArr2.length < 1000) {
            chartArr2.map((i, index) => {
                if (i%10 === 0) {
                    avg.push((
                        i 
                        + chartArr2[index -1] 
                        + chartArr2[index -2] 
                        + chartArr2[index -3] 
                        + chartArr2[index -4]
                        + chartArr2[index -5]
                        + chartArr2[index -6] 
                        + chartArr2[index -7]
                        + chartArr2[index -8]
                        + chartArr2[index -9]
                    )
                        / 10
                    )
                }
            }) 
        } else if (chartArr2.length >= 1000) {
            chartArr2.map((i, index) => {
                if (i%20 === 0) {
                    avg.push((
                        i 
                        + chartArr2[index -1] 
                        + chartArr2[index -2] 
                        + chartArr2[index -3] 
                        + chartArr2[index -4]
                        + chartArr2[index -5]
                        + chartArr2[index -6] 
                        + chartArr2[index -7]
                        + chartArr2[index -8]
                        + chartArr2[index -9]
                        + chartArr2[index -10] 
                        + chartArr2[index -11] 
                        + chartArr2[index -12] 
                        + chartArr2[index -13] 
                        + chartArr2[index -14]
                        + chartArr2[index -15]
                        + chartArr2[index -16] 
                        + chartArr2[index -17]
                        + chartArr2[index -18]
                        + chartArr2[index -19]
                    )
                        / 20
                    )
                }
            }) 
        } else {
            chartArr2.map((i, index) => {
                avg.push(i)
            }) 
        }
        
        const pct = avg.map(i => 
            `${(((i - min) / (max - min))*100).toFixed(0)}%`
        )

        return pct
    }

    const chartTimeArr = () => {
        return time.client === "1D"
            ? props.chart.map(i => i.minute)
            : props.chart.map(i => i.date)
    }

    const GradientGreen = ({ index }) => {
        return (
            <Defs key={index}>
                <LinearGradient id={'gradient'} gradientTransform="rotate(90)">
                    <Stop offset={'0%'} stopColor={globalStyle.color.green} stopOpacity={0.1}/>
                    <Stop offset={'100%'} stopColor={'rgba(0, 0, 0, 0)'} stopOpacity={0}/>
                </LinearGradient>
            </Defs>
        )
    }

    const GradientRed = ({ index }) => {
        return (
            <Defs key={index}>
                <LinearGradient id={'gradient'} gradientTransform="rotate(90)">
                    <Stop offset={'0%'} stopColor={globalStyle.color.red} stopOpacity={0.1}/>
                    <Stop offset={'100%'} stopColor={'rgba(0, 0, 0, 0)'} stopOpacity={0}/>
                </LinearGradient>
            </Defs>
        )
    }

    const Line = (props) => (
        <Path
            d={ props.line }
            stroke={ props.pos}
            strokeWidth={1.5}
            fill={ 'none' }
        />
    )

    const Item = ({item}) => {
        return (

            <TouchableOpacity
                onPress={() => setTime(item)}
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    height: 30,
                    width: 30,
                    backgroundColor: item.client === time.client
                        ? globalStyle.color.elMedium 
                        : 'transparent',
                    borderRadius: 7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }}
                activeOpacity={1}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: item.client === time.client
                            ? 'bold'
                            : 'normal',
                        fontSize: 10,
                    }}
                >
                    {item.client}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <View>
            <FlatList
                data={times}
                renderItem={({item}) => <Item item={item}/>}
                horizontal={true}
                style={{
                    height: 40,
                    borderTopWidth: .5,
                    borderTopColor: globalStyle.color.elMedium,
                    borderBottomWidth: .5,
                    borderBottomColor: globalStyle.color.elMedium,
                }}
                showsHorizontalScrollIndicator={false}
            />
            <View
                style={{
                    width: '100%',
                    height: 220,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal: globalStyle.elPadding
                }}
            >
                {
                    loading
                        ?
                            <View
                                style={{
                                    flexGrow: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <ActivityIndicator
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: 100
                                    }}
                                />
                            </View>

                        : 
                            <Fragment>
                                <AreaChart
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        borderBottomColor: globalStyle.color.elMedium,
                                        borderBottomWidth: 1
                                    }}
                                    data={chartPriceArr()}
                                    curve={shape.curveBasis}
                                    svg={{ 
                                        fill: 'url(#gradient)',
                                    }}
                                    // key={props.item.symbol}
                                    contentInset={{
                                        right: distance(),
                                        top: 10
                                    }}
                                    // numberOfTicks={4}
                                    
                                >
                                    <Line
                                        pos={posOrNeg ? globalStyle.color.green : globalStyle.color.red}
                                    />
                
                                    {posOrNeg
                                        ?
                                            <GradientGreen/>
                                        :
                                            <GradientRed/>
                                    }

                                    <Grid
                                        svg={{
                                            fill: 'white',

                                        }}
                                    />

                                </AreaChart>
                                <View
                                    style={{
                                        height: 200,
                                        width: distance(),
                                        marginLeft: -distance(),
                                        paddingLeft: 10,
                                        paddingTop: 10,
                                        paddingBottom: 30,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {
                                        chartTicks().map(i =>
                                            <Text
                                                style={{
                                                    color: globalStyle.color.white,
                                                    fontSize: 12,
                                                    fontWeight: '700'
                                                }}
                                            >
                                                {i}
                                            </Text>
                                        )
                                    }
                                </View>

                                
                                {/* 
                                <XAxis
                                    data={chartTimeArr()}
                                    numberOfTicks={4}
                                    svg={{ fontSize: 10, fill: 'white' }}
                                    style={{
                                        width: '100%',
                                        height: 20,
                                        paddingVertical: 2,
                                    }}
                                />
                                */}

                                <View
                                    style={{
                                        width: '100%',
                                        height: 20,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between',
                                        paddingRight: distance(),
                                        paddingTop: 5
                                    }}
                                >
                                    {
                                        chartVolArr().map((i, index) => 

                                            <View
                                                style={{
                                                    width: 2,
                                                    flexGrow: 1,
                                                    height: i,
                                                    marginRight: 1,
                                                    backgroundColor: globalStyle.color.elLight,
                                                    borderRadius: 10,
                                                }}
                                            />
                                        )
                                    }
                                </View>
                            </Fragment>
                }

            </View>
        </View>


    )
}

const mapStateToProps = state => ({
    chart: state.stockData.chart,
    activeSymbol: state.watchlist.activeSymbol,
    quote: state.stockData.quote
})

export default connect(mapStateToProps, {
    getChartData,
    resetChart
})(StockChart)