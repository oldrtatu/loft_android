import React from 'react'
import { StyleSheet , Dimensions} from 'react-native'
import theme from '../../../config/theme'

const styles = StyleSheet.create({
    container:{
        height:65,
        backgroundColor: theme.PRIMARY_BLUE,
        flexDirection:'row'
    },
    button:{
        width:50,
        height:50,
        padding:14,
        marginTop:10
    },
    image:{
        flex:1,
        resizeMode:"contain"
    },
    text:{
        color:"#fff",
        fontSize:24,
        fontFamily:"Source Sans Pro",
        fontWeight:"bold",
        flex:1,
        alignSelf:"center",
        marginLeft: (Dimensions.get('window').width/2) - 88
    }
})

export default styles;