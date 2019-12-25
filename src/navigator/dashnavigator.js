import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Dashboard from '../components/dashboard';
import Settings from '../components/settings/settings';

import Settingsheader from '../components/navigation/settingheader';

const dashboard = createStackNavigator(
	{
		Dashboard: {
			screen: Dashboard,
			navigationOptions: {
				header: null
			}
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				tabBarVisible: false,
				header: (props) => <Settingsheader {...props} />
			}
		}
	},
	{
		initialRouteName: 'Dashboard',
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
