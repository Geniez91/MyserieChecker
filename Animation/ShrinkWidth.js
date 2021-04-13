import React, { Component } from 'react'
import {Animated} from 'react-native'

export class ShrinkWidth extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             width:new Animated.Value(this.getSize())
        }
    }
    componentDidUpdate() {
        Animated.spring(this.state.width,{
            toValue:this.getSize(),
            speed:100
        })
    }
    getSize(){
        if(this.props.shouldEnlarge===true){
            return 80
        }
        else
        {
            return 40
        }
    }
    
    
    render() {
        return (
          <Animated.View style={{width:this.state.width,height:this.state.width}}>
              {this.props.children}
          </Animated.View>
        )
    }
}

export default ShrinkWidth
