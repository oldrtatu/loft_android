import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'


const viewstyle = StyleSheet.create({
    topbar:{
        height:110,
        backgroundColor:"#507df0",
        flexDirection:"row"
    },
    backcontainer:{
        width:70,
        height:110,
        paddingVertical:45,
        paddingHorizontal:25,
        alignContent:"center"
    },
    backimage:{
        width:20,
        height:20,
        resizeMode:"contain"
    },
    heading:{
        flex:1,
        color:"#fff",
        fontSize:20,
        alignSelf:"center",
        marginLeft: (Dimensions.get('window').width/2)-135
    },
    restarea:{
        flex:1,
        borderTopEndRadius:5,
        borderTopStartRadius:5,
        marginTop:-10,
        backgroundColor:"#fff"
    },
    details:{
        width:Dimensions.get('window').width * 0.8,
        alignSelf:"center",
        paddingVertical:20
    },
    row:{
        height:30,
        flexDirection:"row",
        flex:1,
        alignItems:"center"
    },
    lefttext:{
        flex:1,
        fontSize:17,
        fontWeight:"700",
        color:"#8991A2"
    },
    righttext:{
        fontSize:17,
        color:"#131d4a"
    },
    separator:{
        width:Dimensions.get('window').width * 0.8,
        alignSelf:"center",
        height:1,
        backgroundColor:"#707070"
    },
    paragraph:{
        flex:1
    },
    longtextheading:{
        flex:1,
        fontSize:17,
        fontWeight:"700",
        color:"#8991A2"
    },
    longtext:{
        paddingVertical:5,
        flex:1,
        fontSize:17,
        color:"#131d4a",
        textAlign:"justify"
    },
    leftissuetext:{
        flex:1,
        fontSize:17,
        color:"#131d4a"
    },
    editbutton:{
        backgroundColor:"#507df0",
        height:60,
        justifyContent:"center",
        alignItems:"center"
    },
    editbuttontext:{
        color:"#fff",
        fontSize:18
    }
})

export default viewstyle