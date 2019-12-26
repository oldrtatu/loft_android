import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import styles from './styles/settingheader'

import back from '../../assets/back.png'

class Nav extends React.Component{

    constructor(props){
        super(props)
    }

    changeNav = () => {
        this.props.navigation.goBack(null)
    }
    
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.changeNav}>
                    <Image source={back} style={styles.image}></Image>
                </TouchableOpacity>
                <Text style ={styles.text}>Settings</Text>
            </View>
        )
    }
}

export default Nav