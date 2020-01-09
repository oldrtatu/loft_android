import React from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	SafeAreaView
} from 'react-native';

import topnav from '../assets/topnav.png';
import settings from '../assets/settings.png';
import profile from '../assets/profile.png';

import inventory from '../assets/router/inventory.png';
import issues from '../assets/router/issues.png';
import po from '../assets/router/po.png';
import report from '../assets/router/report.png';
import notification from '../assets/router/notification.png';

import { GlobalContext } from '../provider';

import styles from './styles/dashboard';

const Icons = {
	Inventory: inventory,
	Issues: issues,
	'Purchase Order': po,
	Reports: report,
	Notifications: notification
};

class DashboardJSX extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_data: props.context.user_data,
			image: profile
		};
	}

	UNSAFE_componentWillReceiveProps(newprops){
		this.setState({
			user_data: newprops.context.user_data
		})
	}

	cards = {
		'Purchase Order': { Active: 'active', Complete: 'normal' },
		Notifications: { Unread: 'alert' },
		Issues: { Open: 'open', 'Due in 2 days': 'normal' },
		Reports: { Total: 'normal' },
		Inventory: { 'Low in stock': 'alert' }
	};

	changeToSettings = () => {
		this.props.navigation.navigate('Settings');
	};

	changeNav = (routeName) => {
		this.props.navigation.navigate(routeName)
	}

	render() {
		let rowlength = Object.keys(this.cards).length;
		let keyarray = Object.keys(this.cards);
		let evenobject = {};
		let oddobject = {};
		let i = 0;
		let toshow = this.state.user_data.dashboardConfig.toString().split('');
		let firstcard = '';
		while (i < rowlength) {
			if (toshow[i] == 1) {
				if (firstcard == '') {
					firstcard = keyarray[i];
				} else if (Object.keys(oddobject).length <= Object.keys(evenobject).length) {
					oddobject[keyarray[i]] = this.cards[keyarray[i]];
				} else {
					evenobject[keyarray[i]] = this.cards[keyarray[i]];
				}
			}
			i++;
		}

		return (
			<SafeAreaView style={[ styles.containerStyle, { backgroundColor: '#507df0' } ]}>
				<ScrollView style={styles.containerStyle}>
					<View style={styles.topbar}>
						<ImageBackground source={topnav} style={styles.background}>
							<View style={styles.topline}>
								<Text style={styles.navheading}>Dashboard</Text>
								<TouchableOpacity style={styles.settingtap} onPress={this.changeToSettings}>
									<Image source={settings} style={styles.settings} />
								</TouchableOpacity>
							</View>
							<View style={styles.profilebar}>
								<Image
									source={{
										uri: this.props.context.url + this.state.user_data.profile,
										headers: {
											Authorization: `Bearer ${this.props.context.token}`
										},
										method: 'GET'
									}}
									style={styles.profileimage}
								/>
								<Text style={styles.greetings}>
									Greetings! {this.state.user_data.firstName} {this.state.user_data.lastName}
								</Text>
							</View>

							{firstcard != '' ? (
								<TouchableOpacity activeOpacity={1} onPress={(e)=>this.changeNav(firstcard)}>
									<View style={styles.card1}>
										<Image source={Icons[firstcard]} style={styles.cardimage} />
										<Text style={styles.cardtitle}>{firstcard}</Text>

										<View style={styles.cardinfo}>
											{Object.keys(this.cards[firstcard]).map((item, i) => (
												<View key={i} style={styles.info}>
													<Text style={styles[this.cards[firstcard][item]]}>123</Text>
													<Text style={styles.text}>{item}</Text>
												</View>
											))}
										</View>
									</View>
								</TouchableOpacity>
							) : null}
						</ImageBackground>
					</View>
					<View style={styles.restarea}>
						<View style={styles.leftcolumn}>
							{Object.keys(oddobject).map((item, i) => (
								<TouchableOpacity activeOpacity={1} onPress={(e)=>this.changeNav(item)} key={i}>
									<View style={styles.normalcard}>
										<Image source={Icons[item]} style={styles.cardimage} />
										<Text style={styles.cardtitle}>{item}</Text>
										{Object.keys(this.cards[item]).map((action, i) => (
											<View style={styles.normalcardinfo} key={i}>
												<View style={styles.normalinfo}>
													<Text style={styles[this.cards[item][action]]}>12</Text>
													<Text style={styles.text}>{action}</Text>
												</View>
											</View>
										))}
									</View>
								</TouchableOpacity>
							))}
						</View>
						<View style={styles.rightcolumn}>
							{Object.keys(evenobject).map((item, i) => (
								<TouchableOpacity activeOpacity={1} onPress={(e)=>this.changeNav(item)} key={i}>
									<View style={styles.normalcard}>
										<Image source={Icons[item]} style={styles.cardimage} />
										<Text style={styles.cardtitle}>{item}</Text>
										{Object.keys(this.cards[item]).map((action, i) => (
											<View style={styles.normalcardinfo} key={i}>
												<View style={styles.normalinfo}>
													<Text style={styles[this.cards[item][action]]}>123</Text>
													<Text style={styles.text}>{action}</Text>
												</View>
											</View>
										))}
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const Dashboard = (props) => (
	<GlobalContext.Consumer>{(context) => <DashboardJSX context={context} {...props} />}</GlobalContext.Consumer>
);

export default Dashboard;
