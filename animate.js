import {
    Animated,
    Platform
} from 'react-native'

export const animate = (input, value, duration) => {
    Animated.timing(input, {
        toValue: value,
        duration: duration,
        useNativeDriver: Platform.OS === 'ios' ? true : false
    }).start()
}
