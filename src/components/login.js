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

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: "#fff",
      alignItems: "center",
      fontFamily:"Source Sans Pro",
      justifyContent:"center"
    },
    background:{
      width: "100%",
      height: "100%",
      alignItems:"center",
      flex:1,
      justifyContent:"center"
    },
    textinput:{
      width: "90%",
      height: 50,
      borderWidth :1,
      borderColor:"#e6e6e6",
      marginBottom:15,
      paddingLeft: 25,
      fontSize:14,
      color:"#131D4A",
      borderRadius:2
    },
    button:{
      backgroundColor:"#90B7FB",
      height:50,
      width:"90%",
      borderRadius:2,
      color:"#507DF0",
      alignItems:"center",
      justifyContent:"center"
    },
    error:{
      color:"#D62246",
      marginBottom:15,
      marginLeft:"5%",
      alignSelf:"flex-start"
    }
});

export default LogIn;

