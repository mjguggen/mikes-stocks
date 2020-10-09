import React from 'react'
import { 
    View,
    
} from 'react-native'
import {connect} from 'react-redux'
import { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import * as shape from 'd3-shape'


//Components
import {LineChart, AreaChart} from 'react-native-svg-charts'
import { globalStyle } from '../style'

const IntraDayChart = props => {
    const data = (symbol) => {
        let arr = []

        props.intraDay[symbol] !== undefined 
            ? props.intraDay[symbol].map(i => i.average !== null ? arr.push(i.average) : null)
            : null

        return arr
    }

    const posOrNeg = (symbol) => {
        if(props.quote[symbol] !== undefined) {
            if (props.quote[symbol].quote.change > 0) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
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

    return (
        <AreaChart
            style={{
                width: '100%',
                height: '100%',
            }}
            data={data(props.item.symbol)}
            curve={shape.curveNatural}
            svg={{ 
                fill: 'url(#gradient)',
            }}
            key={props.item.symbol}
        >
            <Line
                pos={posOrNeg(props.item.symbol) ? globalStyle.color.green : globalStyle.color.red}
            />

            {posOrNeg(props.item.symbol)
                ?
                    <GradientGreen/>
                :
                    <GradientRed/>
            }
        </AreaChart>
    )
}

const mapStateToProps = state => ({
    intraDay: state.stockData.intraDay,
    quote: state.stockData.quote
})

export default connect(mapStateToProps, {

}) (IntraDayChart)