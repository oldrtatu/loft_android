import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { View, Text } from 'react-native';

import Dashboard from '../navigator/dashnavigator';
import Purchaseorder from '../navigator/purchasenavigator'
import InventoryNav from '../navigator/inventorynavigator'
import IssuesNav from '../navigator/issuesnavigator'
import ReportView from '../components/reports/report'

import Nav from '../components/navigation/bottomnav';

const TestScreen = () => {
	return (
		<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
			<Text>This page is still in development phase</Text>
		</View>
	);
};

const MainApp = createBottomTabNavigator(
	{
		Dashboard: Dashboard,
		Inventory: InventoryNav,
		Issues: IssuesNav,
		'Purchase Order': Purchaseorder,
		Reports: ReportView,
        Notifications: TestScreen
	},
	{
		initialRouteName: 'Dashboard',
		tabBarComponent: (props) => <Nav {...props}/>
		
	}
);

export default MainApp;
