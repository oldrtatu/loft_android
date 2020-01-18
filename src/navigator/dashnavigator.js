import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from '../components/dashboard';
import SettingsNav from './settingsnavigator';


const dashboard = createStackNavigator(
	{
		Dash: {
			screen: Dashboard,
			navigationOptions: {
				header: null
			}
		},
		Settings: {
			screen: SettingsNav,
			navigationOptions: {
				tabBarVisible: false,
				header: null
			}
		}
	},
	{
		initialRouteName: 'Dash',
		navigationOptions: ({ navigation }) => {
			let tabBarVisible = true;
			if (navigation.state.index > 0) {
				tabBarVisible = false;
			}
			return {
				tabBarVisible
			};
		}
	}
);

export default dashboard;
