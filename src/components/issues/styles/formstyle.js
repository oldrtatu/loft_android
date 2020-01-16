import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const form = StyleSheet.create({
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
        alignContent:"center",
        alignSelf:"flex-start"
    },
    backimage:{
        width:18,
        height:18,
        resizeMode:"contain"
    },
    heading:{
        flex:1,
        color:"#fff",
        fontSize:18,
        fontWeight:"bold",
        alignSelf:"center",
        position:"absolute",
        width:"100%",
        textAlign:"center",
        zIndex:-1
    },
	mainform: {
		flex: 1,
		width: Dimensions.get('window').width,
		alignSelf: 'center'
	},
	label: {
		flex: 1,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'rgba(80,86,101,0.36)',
		marginTop: 15,
		marginLeft: 10,
		width: Dimensions.get('window').width*0.85,
		alignSelf:"center"
	},
	input: {
		flex: 1,
		paddingLeft: 12,
		color: '#131d4a',
		fontSize: 17,
		height: 60,
        borderWidth: 1,
        borderColor:"#e6e6e6",
		backgroundColor: 'transparent',
		marginTop: -25,
		paddingTop: 30,
		width: Dimensions.get('window').width*0.85,
		alignSelf:"center"
    },
	inputarea: {
		paddingLeft: 12,
		color: '#131d4a',
		fontSize: 17,
		flex:1,
        borderWidth: 1,
        borderColor:"#e6e6e6",
		backgroundColor: 'transparent',
		marginTop: -25,
		paddingTop:20,
		marginBottom:20,
		width: Dimensions.get('window').width*0.8,
		alignSelf:"center"
    },
    start:{
        borderColor:"#e6e6e6"
    },
    error:{
        borderColor:"#D62246"
    },
    correct:{
        borderColor:"#1CA49F"
    },
    suggestbox:{
        backgroundColor:"#fff",
        marginTop:80,
        position:"absolute",
		width:Dimensions.get('window').width*0.8,
		alignSelf:"center",
        zIndex:30,
        shadowColor:"#000",
        shadowOffset:{width:0,height:3},
        elevation:10,
        shadowOpacity:0.3
	},
	partnumber:{
		color:"#507DF0",
		fontSize:15,
		flex:1,
		height:20,
		marginRight:32,
		marginTop:10,
		marginLeft:"auto",
		fontWeight:"600"
	},
    editbutton:{
        backgroundColor:"#1CA49F",
        height:60,
        justifyContent:"center",
        alignItems:"center"
    },
    editbuttontext:{
        color:"#fff",
        fontSize:18
	},
	tabswitch:{
		backgroundColor:"#F6F7F9",
		height:65,
		width:Dimensions.get('window').width*0.85,
		alignSelf:"center",
		marginTop:10,
		flexDirection:"row"
	},
	tabtitleview:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	tabtitle:{
		fontSize:14
	},
	active:{
		borderBottomWidth:3,
		borderBottomColor:"#507DF0"
	},
	notactive:{
		borderBottomWidth:0
	},
	checkmaincontainer:{
		flex:1,
		width:Dimensions.get('window').width*0.85,
		alignSelf:"center",
		marginBottom:20
	},
	checkheading:{
		color:"#131d4a",
		fontSize:18,
		marginTop:20,
		fontWeight:"700"
	},
	checkboxcontainer:{
		flex:1,
		flexDirection:"row",
		height:40,
		paddingTop:5
	},
	checktext:{
		flex:1,
		color:"#131d4a",
		fontSize:12,
		paddingTop:10,
		height:35,
		marginLeft:10
	}
});

export default form;
