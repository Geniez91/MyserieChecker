import React, { Component } from 'react'
import {Animated,Dimensions,View} from 'react-native'

export class fadeOut extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             postionLeft:new Animated.Value(Dimensions.get('window').width)
        }
    }
    componentDidMount() {
        Animated.spring(this.state.postionLeft,{
            toValue:1,
            speed:2
        }).start()
    }
    
    
    render() {
        return (
           <Animated.View style={{left:this.state.postionLeft}}>
            {this.props.children}
           </Animated.View>
        )
    }
}

export default fadeOut
