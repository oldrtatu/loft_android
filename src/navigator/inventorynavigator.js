import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import inventory from '../components/inventory/datatable'
import ViewInventory from '../components/inventory/view'
import InventoryForm from '../components/inventory/form'
import AddForm from '../components/inventory/addform'

const inventorynav = createStackNavigator(
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
        },
        Form:{
            screen:InventoryForm,
            navigationOptions:{
                header:null
            }
        },
        Add:{
            screen:AddForm,
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

export default inventorynav;