import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import inventory from '../components/inventory/datatable'
import ViewInventory from '../components/inventory/view'

const purchase = createStackNavigator(
    {
        Inventory:{
            screen:inventory,
            navigationOptions:{
                header:null
            }
        },
        View:{
            screen: ViewInventory,
            navigationOptions:{
                header:null
            }
        }
    },
    {
        initialRouteName:'Inventory',
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
)

export default purchase;