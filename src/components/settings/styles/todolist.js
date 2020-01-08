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
		alignSelf:"center",
		backgroundColor:"white"
	}
})

export default styles