import React from 'react'
import { StyleSheet } from 'react-native'
import THEME from '../../../config/theme'

const styles = StyleSheet.create({
	container: {
		height: 70,
		backgroundColor: '#fff',
		borderRadius: 15,
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: -2 },
		elevation: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	image: {
		width: 20,
		height: 20,
		resizeMode: 'stretch',
		marginLeft: 20
	},
	navIconContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 40,
		minHeight: 40,
		position: 'relative'
	},

	activeStyle: {
		borderRadius: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	spotLight: {
		width: 50,
		height: 40,
		backgroundColor: THEME.NAV_BACK,
		borderRadius: 20,
		position: 'absolute',
		zIndex: -1
	},
	navIconText: {
		marginLeft: 10,
		fontSize: 12
	},
	iconImage: {
		width: 15,
		height: 15,
		resizeMode: 'contain'
	}
});

export default styles;