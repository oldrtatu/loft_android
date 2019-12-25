import React from 'react'
import { StyleSheet, Dimensions} from 'react-native'

const modal = StyleSheet.create({
    background:{
        backgroundColor:"#000",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('window').height,
        opacity:0.7
    },
    container:{
        width: Dimensions.get('window').width * 0.8,
        height:200,
        backgroundColor:"#fff",
        opacity:1,
        marginTop: -100 - (Dimensions.get('window').height/2),
        alignSelf:"center"
    },
    closemodal:{
        marginLeft:"auto",
        width:50,
        height:50,
        padding:18,
        marginBottom: 10
    },
    closeimage:{
        flex:1,
        marginLeft:-45,
        resizeMode:"contain"
    },
    topimage:{
        width:60,
        height:60,
        resizeMode:"contain",
        alignSelf:"center",
        marginTop:-20
    }
})

export default modal