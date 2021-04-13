import React, { Component } from 'react'
import {Animated,View,Dimensions} from 'react-native'

export class fadeIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             positionLeft:new Animated.Value(Dimensions.get('window').width)///pour récupérer les dimensions de l'écran
        }
    }
    componentDidMount() {
        Animated.spring(this.state.positionLeft,{
            toValue:0,
            useNativeDriver:false
        }).start()///pour démarrer l'animation
    }
    
    
    render() {
        return (
            <Animated.View style={{left:this.state.positionLeft}}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default fadeIn
