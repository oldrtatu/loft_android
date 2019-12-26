import React from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
	ScrollView,
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

import styles from './styles/dashboard'

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
		Issues: { Open: 'open', 'Due in 2 days': 'normal' },
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

export default Dashboard;
