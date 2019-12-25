import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';

import topnav from '../assets/topnav.png';
import settings from '../assets/settings.png';
import profile from '../assets/profile.png';

import inventory from '../assets/router/inventory.png';
import issues from '../assets/router/issues.png';
import po from '../assets/router/po.png';
import report from '../assets/router/report.png';
import notification from '../assets/router/notification.png';

const Icons = {
	Inventory: inventory,
	Issues: issues,
	'Purchase Orders': po,
	Reports: report,
	Notifications: notification
};

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstcard: 'Purchase Orders'
		};
	}
	cards = {
		'Purchase Orders': { Active: 'active', Complete: 'normal' },
		Notifications: { Unread: 'alert' },
		Issues: { Open: 'open', 'Due in next 2 days': 'normal' },
		Reports: { Total: 'normal' },
		Inventory: { 'Low in stock': 'alert' }
	}

	changeToSettings = () => {
		this.props.navigation.navigate('Settings')
	}

	render() {
		let rowlength = Object.keys(this.cards).length;
		let keyarray = Object.keys(this.cards);
		let evenobject = {};
		let oddobject = {};
		for (let i = 1; i < rowlength; i++) {
			if (i % 2 == 0) {
				evenobject[keyarray[i]] = this.cards[keyarray[i]];
			} else {
				oddobject[keyarray[i]] = this.cards[keyarray[i]];
			}
		}
		return (
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
							<Image source={profile} style={styles.profileimage} />
							<Text style={styles.greetings}>Greetings! John Doe</Text>
						</View>
						<TouchableWithoutFeedback>
							<View style={styles.card1}>
								<Image source={Icons[this.state.firstcard]} style={styles.cardimage} />
								<Text style={styles.cardtitle}>{this.state.firstcard}</Text>
								<View style={styles.cardinfo}>
									{Object.keys(this.cards[this.state.firstcard]).map((item, i) => (
										<View key={i} style={styles.info}>
											<Text style={styles[this.cards[this.state.firstcard][item]]}>123</Text>
											<Text style={styles.text}>{item}</Text>
										</View>
									))}
								</View>
							</View>
						</TouchableWithoutFeedback>
					</ImageBackground>
				</View>
				<View style={styles.restarea}>
					<View style={styles.leftcolumn}>
						{Object.keys(oddobject).map((item, i) => (
							<TouchableWithoutFeedback  key={i}>
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
							</TouchableWithoutFeedback>
						))}
					</View>
					<View style={styles.rightcolumn}>
						{Object.keys(evenobject).map((item, i) => (
							<TouchableWithoutFeedback key={i}>
								<View style={styles.normalcard} >
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
							</TouchableWithoutFeedback>
						))}
					</View>
				</View>
			</ScrollView>
		);
	}
}

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
		fontSize: 24,
		fontWeight: 'bold',
		flex: 1
	},
	settingtap: {
		width: 40,
		height: 40,
		marginRight: 25
	},
	settings: {
		width: 25,
		height: 25,
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
		borderRadius: 20
	},
	greetings: {
		lineHeight: 45,
		fontSize: 13,
		color: '#fff',
		marginLeft: 10
	},
	card1: {
		backgroundColor: '#fff',
		width: '90%',
		height: 150,
		alignSelf: 'center',
		shadowColor: '#000000',
		shadowOpacity: 0.2,
		shadowOffset: { x: 0, y: 3, b: 6 },
		elevation: 3,
		borderRadius: 5,
		marginBottom: -30
	},
	cardimage: {
		width: 26,
		height: 26,
		marginTop: 20,
		marginLeft: 20,
		resizeMode: 'contain'
	},
	cardtitle: {
		color: '#131d4a',
		marginLeft: 20,
		marginTop: 20,
		fontSize: 20,
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
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 5
	},
	normal: {
		backgroundColor: '#E6E6E6',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 5
	},
	alert: {
		backgroundColor: '#D62246',
		color: '#fff',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 5
	},
	open: {
		backgroundColor: '#F68257',
		color: '#fff',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 5
	},
	info: {
		flex: 1,
		flexDirection: 'row',
		height: 25
	},
	text: {
		lineHeight: 25,
		marginLeft: 10
	},
	restarea: {
		marginTop: 30,
		flex: 1,
		flexDirection: 'row',
		width: Dimensions.get('window').width * 0.9,
		alignSelf: 'center',
		marginBottom: 5
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

export default Dashboard;
