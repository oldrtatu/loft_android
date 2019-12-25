import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const window = {}

window["width"] = Dimensions.get('window').width
window["height"] = Dimensions.get('window').height

class Dashboard extends React.Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<View style={styles.sliderContainerStyle}>
					<Text>Hello</Text>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
    containerStyle: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 1.7,
        borderWidth: 1
    },
    sliderContainerStyle: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        borderWidth: 1
    },
    slider: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    }});

export default Dashboard;
