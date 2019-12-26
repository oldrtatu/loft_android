import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import purchaseorder from '../components/purchaseorder/datatable'

const purchase = createStackNavigator(
    {
        Purchase:{
            screen:purchaseorder,
            navigationOptions:{
                header:null
            }
        }
    },
    {
        initialRouteName:'Purchase'
    }
)

export default purchase;