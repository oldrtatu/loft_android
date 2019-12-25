import React from 'react'
import { StyleSheet } from 'react-native'

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

export default styles;