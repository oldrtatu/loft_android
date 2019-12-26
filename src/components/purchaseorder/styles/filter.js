import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        fontFamily:"Source Sans Pro",
        height:190
    },
    topbar:{
        backgroundColor:"#507df0",
        height:60,
        flexDirection:"row"
    },
    navheading:{
        color:"#fff",
        fontSize:24,
        flex:1,
        alignSelf:"center",
        fontWeight:"bold",
        marginLeft:25
    },
    searchcontainer:{
        width:60,
        height:60,
        marginRight:20,
        padding:12,
        justifyContent:"center"
    },
    searchimage:{
        resizeMode:"contain",
        width:20,
        height:20,
        alignSelf:"flex-end"
    },
    searchbar:{
        width: Dimensions.get('window').width * 0.9,
        height: 40,
        paddingLeft:15,
        borderWidth:1,
        borderColor:"#fff",
        color:"#fff",
        fontSize:17,
        backfaceVisibility:"hidden",
        alignSelf:"center",
        marginLeft:25
    },
    closeimagecontainer:{
        width:60,
        height:60,
        marginLeft:-70,
        padding:12,
        justifyContent:"center"
    },
    closeimage:{
        resizeMode:"contain",
        width:15,
        height:15,
        alignSelf:"flex-end"
    },
    filterbar:{
        height:80,
        backgroundColor:"#507df0",
        flex:1,
        flexDirection:"row"
    },
    activefilter:{
        backgroundColor:"#fff",
        height:30,
        borderRadius:5,
        justifyContent:"center",
        paddingHorizontal:10,
        marginRight: 15,
        marginTop:10
    },
    firstfilter:{
        marginLeft:25
    },
    normalfilter:{
        backgroundColor: "rgba(144,183,251,0.76)",
        height:30,
        borderRadius:5,
        justifyContent:"center",
        paddingHorizontal:10,
        marginRight: 15,
        marginTop:10
    },
    activefiltertext:{
        color:"#131d4a",
        fontSize:15
    },
    filtertext:{
        color:"#fff",
        fontSize:15
    }
})

export default styles;