import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import purchaseorder from '../components/purchaseorder/datatable'
import ViewPurchaseOrder from '../components/purchaseorder/view'
import POForm from '../components/purchaseorder/form'

const purchase = createStackNavigator(
    {
        Purchase:{
            screen:purchaseorder,
            navigationOptions:{
                header:null
            }
        },
        View:{
            screen: ViewPurchaseOrder,
            navigationOptions:{
                header:null
            }
        },
        Form:{
            screen:POForm,
            navigationOptions:{
                header:null
            }
        }
    },
    {
        initialRouteName:'Purchase',
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