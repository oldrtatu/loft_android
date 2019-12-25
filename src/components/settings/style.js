import React from 'react'
import { StyleSheet, Dimensions} from 'react-native'
import THEME from '../../config/theme'

const styles = StyleSheet.create({
    containerStyle:{
        flex:1
    },
    topbar:{
        backgroundColor: THEME.PRIMARY_BLUE,
        height:100
    },
    restarea:{
        flex:1,
        backgroundColor:"#fff",
        borderRadius:30,
        marginTop:-40,
        alignContent:"center"
    },
    profileimage:{
        width:120,
        height:120,
        resizeMode:"cover",
        marginTop: -60,
        alignSelf:"center",
        borderRadius: 60
    },
    camera:{
        width:25,
        height:25,
        resizeMode:"contain",
        alignSelf:"center",
        marginTop: -40,
        marginLeft:100
    },
    firstformcomponent:{
        width: Dimensions.get('window').width * 0.8,
        height: 70,
        marginTop: 35,
        alignSelf:"center"
    },
    otherformcomponent:{
        width: Dimensions.get('window').width * 0.8,
        height: 70,
        marginTop: 10,
        alignSelf:"center"
    },
    label:{
        color:"#8991A2",
        fontWeight:"700",
        fontSize:17
    },
    textinput:{
        height:40,
        borderRadius:20,
        borderWidth:1,
        marginTop:7,
        paddingLeft:20,
        color:"#131D4A",
        fontSize: 15,
        borderColor:"#E6E6E6"
    },
    separator:{
        width:Dimensions.get('window').width * 0.8,
        height:1,
        backgroundColor:"#8991A2",
        alignSelf:"center",
        marginVertical: 15
    },
    navigator:{
        width:Dimensions.get('window').width * 0.8,
        alignSelf:"center",
        height:25,
        marginTop: 8,
        flexDirection:"row"
    },
    forwardtitle:{
        flex:1,
        fontSize:17,
        color:"#8991A2",
        fontWeight:"700"
    },
    forwardarrow:{
        width:15,
        height:15,
        resizeMode:"contain",
        alignSelf:"center"
    },
    password:{
        width:Dimensions.get('window').width * 0.8,
        alignSelf:"center",
        height:50,
        marginTop: 100,
        flexDirection:"row",
        backgroundColor:"#131D4A",
        borderRadius:25,
        color:"#fff",
        alignItems:"center",
        justifyContent:"center"
    },
    passwordtitle:{
        fontSize:17,
        color:"#fff",
        fontWeight:"700"
    },
    logout:{
        width:Dimensions.get('window').width * 0.8,
        alignSelf:"center",
        height:50,
        marginTop: 8,
        flexDirection:"row",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        borderColor:"#D62246",
        borderWidth:1
    },
    logouttitle:{
        fontSize:17,
        color:"#D62246",
        fontWeight:"700"
    }
})

export default styles;