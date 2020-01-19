import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    containerStyle: {
		backgroundColor:"#F6F7F9"
	},
	topbar: {
		width: '100%',
		height: 250
	},
	background: {
		flex: 1,
		resizeMode: 'stretch',
		fontFamily: 'Source Sans Pro',
		paddingTop:20
	},
	username:{
		color:"#fff",
		paddingVertical:5,
		marginLeft:35,
		fontSize:16
	},
	liststyle:{
		marginTop:-150,
		width:Dimensions.get('window').width * 0.85,
		alignSelf:"center"
	},
	row:{
		backgroundColor:"white",
		marginVertical:2,
		height:70,
		paddingLeft:20,
		borderRadius:5,
		flexDirection:"row",
		alignItems:"center"
	},
    text:{
        fontSize:15,
        marginRight:15,
        flex:1,
        alignSelf:"center"
    },
    forward:{
        width:40,
        height:14,
        resizeMode:"contain",
        marginRight:20,
        marginLeft:5,
        marginTop:5
	},
	rowback:{
		alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
	}
})

export default styles