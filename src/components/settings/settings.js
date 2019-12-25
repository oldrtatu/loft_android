import React from 'react'
import {Text,View, ScrollView, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native'


import profile from '../../assets/profile.png'
import camera from '../../assets/camera.png'
import forward from '../../assets/forward.png'
import password from '../../assets/password.png'
import logout from '../../assets/logout.png'

import styles from './style'


class Settings extends React.Component{

    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return (
            <ScrollView style={styles.containerStyle}>
                <View style={styles.topbar}></View>
                <View style={styles.restarea}>
                    <TouchableWithoutFeedback>
                        <View>
                            <Image source={profile} style={styles.profileimage}/>
                            <Image source={camera} style={styles.camera}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.firstformcomponent}>
                        <Text style= {styles.label}>First Name</Text>
                        <TextInput style={styles.textinput} placeholder="Enter first name" defaultValue="John" />
                    </View>
                    <View style={styles.otherformcomponent}>
                        <Text style= {styles.label}>Last Name</Text>
                        <TextInput style={styles.textinput} placeholder="Enter last name" defaultValue="Doe" />
                    </View>
                    <View style={styles.otherformcomponent}>
                        <Text style= {styles.label}>Email address</Text>
                        <TextInput style={styles.textinput} placeholder="Enter email address" defaultValue="johndoe@gmail.com" />
                    </View>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.navigator}>
                        <Text style={styles.forwardtitle}>Customise dashboard</Text>
                        <Image source={forward} style={styles.forwardarrow}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigator}>
                        <Text style={styles.forwardtitle}>To do list</Text>
                        <Image source={forward} style={styles.forwardarrow}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.password}>
                        <Text style={styles.passwordtitle}>Change Password    </Text>
                        <Image source={password} style={styles.forwardarrow}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logout} onPress={this.logout}>
                        <Text style={styles.logouttitle}>Logout   </Text>
                        <Image source={logout} style={styles.forwardarrow}></Image>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}


export default Settings;