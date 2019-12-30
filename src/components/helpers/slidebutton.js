import React from 'react';
import { StyleSheet, Animated, PanResponder, View, Text, Dimensions } from 'react-native';

class SlideButton extends React.Component {
	constructor(props) {
		super(props);

		this.gestureDelay = -35;

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => false,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => false,
			onPanResponderMove: (evt, gestureState) => {
				if (gestureState.dx > 35) {
					let newX = gestureState.dx + this.gestureDelay;
					position.setValue({ x: newX, y: 0 });
					this.setState({ position });
				}
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx < Dimensions.get('window').width/2) {
					Animated.timing(this.state.position, {
						toValue: { x: 0, y: 0 },
						duration: 150
					}).start();
				} else {
					Animated.timing(this.state.position, {
						toValue: { x: Dimensions.get('window').width, y: 0 },
						duration: 300
					}).start(()=>this.props.submit());
				}
			}
		});

		this.panResponder = panResponder;
		this.state = { position };
	}

	render() {
		return (
			<View style={styles.buttoncontainer}>
				<Animated.View style={[ this.state.position.getLayout() ]} {...this.panResponder.panHandlers}>
					<View style={styles.savebutton}>
						<Text style={{ color: '#fff', fontSize: 20 }}>Slide to save</Text>
					</View>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttoncontainer: {
		height: 80,
		marginLeft: 0 - Dimensions.get('window').width,
		justifyContent: 'center',
		backgroundColor: 'rgba(28,164,159,0.56)',
		flexDirection: 'row'
	},
	savebutton: {
		width: Dimensions.get('window').width,
		height: 80,
		marginLeft: Dimensions.get('window').width,
		backgroundColor: '#1CA49F',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default SlideButton;
