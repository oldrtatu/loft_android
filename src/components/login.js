import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

import login from '../assets/login.png'
import styles from './styles/login'

class LogIn extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username : "admin",
      password: "admin",
      error:""
    }
  }

  checkLogin = () => {
    if (this.state.password == "admin" && this.state.username == "admin"){
      this.setState({
        error:""
      })
      this.props.navigation.navigate('App')
    }else{
      this.setState({
        error:"Incorrect username or password"
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground source={login} style ={styles.background} >
          <TextInput 
            style={styles.textinput} 
            placeholder="Enter username" 
            defaultValue={this.state.username}
            onChangeText={ text => this.setState({username:text})}
          >
          </TextInput>
          <TextInput 
            style={styles.textinput} 
            placeholder="Enter password" 
            secureTextEntry={true} 
            defaultValue={this.state.password}
            onChangeText={ text => this.setState({password:text})}
          >
          </TextInput>
          {
            (this.state.error != undefined && this.state.error != "")?
              <Text style={styles.error}>{this.state.error}</Text>
              :
              null
          }
          <TouchableOpacity style={styles.button} onPress={this.checkLogin}>
            <Text style={{fontSize:17}}>Sign In</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}


export default LogIn;

