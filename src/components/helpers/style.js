import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const style = StyleSheet.create({
    listItem: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',

    },
    listItemText: {
        fontSize: 15,
        marginLeft:5
    },
    label: {
		flex: 1,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'rgba(80,86,101,0.36)',
		marginTop: 20,
		marginLeft: 10,
		width: Dimensions.get('window').width*0.8,
		alignSelf:"center"
	},
	input: {
		flex: 1,
		paddingLeft: 12,
		color: '#131d4a',
		fontSize: 17,
		height: 70,
        borderWidth: 1,
        borderColor:"#e6e6e6",
		backgroundColor: 'transparent',
		marginTop: -25,
		paddingTop: 30,
		width: Dimensions.get('window').width*0.8,
		alignSelf:"center"
    },
    unit:{
        fontSize:17,
        color:"#131d4a",
        marginTop:48,
        marginLeft:100,
        backgroundColor:"transparent",
        position:"absolute"
    },
    decrementbuttoncontainer:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:-50,
        marginLeft:Dimensions.get('window').width*0.66
    },
    incrementbuttoncontainer:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:-50,
        marginLeft:Dimensions.get('window').width*0.77
    },
    image:{
        width:20,
        height:20,
        resizeMode:"contain"
    }
})

export default style