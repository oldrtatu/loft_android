import React from 'react';
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	Animated,
	Vibration
} from 'react-native';

import dash from '../../assets/router/dashboard.png';
import inventory from '../../assets/router/inventory.png';
import issues from '../../assets/router/issues.png';
import po from '../../assets/router/po.png';
import report from '../../assets/router/report.png';
import notification from '../../assets/router/notification.png';


import THEME from '../../config/theme';
import active from '../../assets/router/active';
import styles from './styles/bottomnav'

const Icons = {
	Dashboard: dash,
	Inventory: inventory,
	Issues: issues,
	'Purchase Order': po,
	Reports: report,
	Notifications: notification
};

class Nav extends React.Component {
	old_x = -1;

	constructor(props) {
		super(props);
		this.state = {
			activeWidth: 0,
			activeHeight: 0,
			activeX: 0,
			translateX: new Animated.Value(0)
		};
	}

	initAnimation = (e) => {
		let activeX = e.nativeEvent.layout.x - 10;
		let activeWidth = e.nativeEvent.layout.width;
		let activeHeight = e.nativeEvent.layout.height;
		this.setState({ activeX, activeWidth, activeHeight });
	};

	navigateTo = (item) => {
		Vibration.vibrate(20);
		this.props.navigation.navigate(item);
	};

	startAnimation = () => {
		if (this.old_x == -1) {
			this.old_x = this.state.activeX;
			return;
		}

		if (this.state.activeX == this.old_x) return;

		Animated.spring(this.state.translateX, {
			toValue: this.state.activeX,
			duration: 10
		}).start();
	};

	render() {
		{
			/** Get the routes from the props and active route index */
		}
		let routes = this.props.navigation.state.routes;
		let index = this.props.navigation.state.index;

		{
			/** funtion for background box animation */
		}
		this.startAnimation();

		{
			/** Render Method */
		}
		return (
			<View style={styles.container}>
				{Object.keys(Icons).map((item, i) => (
					<TouchableOpacity
						style={[ styles.navIconContainer, routes[index].key == item ? styles.activeStyle : null ]}
						key={i}
						onPress={(e) => this.navigateTo(item)}
						onLayout={routes[index].key == item ? this.initAnimation : null}
					>
						<Image
							source={routes[index].key == item ? active[item] : Icons[item]}
							style={styles.iconImage}
						/>
						{routes[index].key == item ? (
							<Text
								style={[
									styles.navIconText,
									routes[index].key == item ? { color: THEME.PRIMARY_BLUE } : null
								]}
							>
								{item}
							</Text>
						) : null}
					</TouchableOpacity>
				))}
				{/** Absolute View for the animation of the background view */}
				<Animated.View
					style={[
						styles.spotLight,
						{
							width: this.state.activeWidth,
							height: this.state.activeHeight,
							transform: [
								{
									translateX: this.state.translateX
								}
							]
						}
					]}
				/>
			</View>
		);
	}
}


export default Nav;
