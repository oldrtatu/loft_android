import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { View, Text } from 'react-native';

import Dashboard from '../components/dashboard';

import Nav from '../components/bottomnavigation/activenav';

const TestScreen = () => {
	return (
		<View>
			<Text>Text Screen</Text>
		</View>
	);
};

const MainApp = createBottomTabNavigator(
	{
		Dashboard: {
			screen: Dashboard,
			path: 'dashboard'
		},
		Inventory: TestScreen,
		Issues: TestScreen,
		'Purchase Order': TestScreen,
		Reports: TestScreen,
        Notifications: TestScreen
	},
	{
		initialRouteName: 'Dashboard',
		tabBarComponent: (props) => <Nav {...props}/>
		
	}
);

export default MainApp;
