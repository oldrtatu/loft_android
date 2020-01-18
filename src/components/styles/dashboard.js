import React from 'react'
import { StyleSheet , Dimensions} from 'react-native'

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor:"#F6F7F9"
	},
	topbar: {
		width: '100%',
		height: 250
	},
	background: {
		flex: 1,
		resizeMode: 'stretch',
		fontFamily: 'Source Sans Pro'
	},
	topline: {
		flexDirection: 'row',
		marginTop: 30,
		marginLeft: 25
	},
	navheading: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		flex: 1
	},
	settingtap: {
		width: 40,
		height: 40,
		marginRight: 25
	},
	settings: {
		width: 20,
		height: 20,
		marginHorizontal: 7.5,
		resizeMode: 'contain'
	},
	profilebar: {
		flex: 1,
		flexDirection: 'row'
	},
	profileimage: {
		width: 40,
		height: 40,
		resizeMode: 'cover',
		marginLeft: 25,
		borderRadius: 20,
		borderWidth: 1
	},
	greetings: {
		lineHeight: 45,
		fontSize: 13,
		color: '#fff',
		marginLeft: 10
	},
	card1: {
		backgroundColor: '#fff',
		width: Dimensions.get('window').width * 0.85,
		height: 130,
		alignSelf: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowOffset: { x: 0, y: 3, b: 6 },
		elevation: 3,
		borderRadius: 5,
		marginBottom: -30
	},
	cardimage: {
		width: 20,
		height: 20,
		marginTop: 20,
		marginLeft: 20,
		resizeMode: 'contain'
	},
	cardtitle: {
		color: '#131d4a',
		marginLeft: 20,
		marginTop: 10,
		fontSize: 14,
		fontWeight: '700'
	},
	cardinfo: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 20
	},
	active: {
		backgroundColor: '#1CA49F',
		color: '#fff',
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 2,
		fontSize:12,
		overflow:"hidden"
	},
	normal: {
		backgroundColor: '#E6E6E6',
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 2,
		fontSize:12,
		overflow:"hidden"
	},
	alert: {
		backgroundColor: '#D62246',
		color: '#fff',
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 2,
		fontSize:12,
		overflow:"hidden"
	},
	open: {
		backgroundColor: '#F68257',
		color: '#fff',
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 2,
		fontSize:12,
		overflow:"hidden"
	},
	info: {
		flex: 1,
		flexDirection: 'row',
		height: 24
	},
	text: {
		lineHeight: 25,
		marginLeft: 10,
		flexWrap:"wrap",
		fontSize:12
	},
	restarea: {
		marginTop: 30,
		flex: 1,
		flexDirection: 'row',
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		marginBottom: 30
	},
	leftcolumn: {
		flex: 1,
		flexDirection: 'column',
		marginRight: 10,
		height: 'auto'
	},
	rightcolumn: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 10,
		height: 'auto'
	},
	normalcard: {
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowOffset: { x: 0, y: 3, b: 6 },
		elevation: 3,
		borderRadius: 5,
		backgroundColor: '#fff',
		marginTop: 20,
		height: 'auto',
		paddingBottom: 20
	},
	normalcardinfo: {
		flex: 1,
		marginTop: 10,
		marginLeft: 20
	},
	normalinfo: {
		flex: 1,
		flexDirection: 'row',
		height: 25
	}
});

export default styles;