import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Dashboard from '../components/dashboard'
import Settings from '../components/settings/settings'

const dashboard = createStackNavigator(
    {
        Dashboard:{
            screen:Dashboard,
            navigationOptions:{
                header:null
            }
        },
        Settings:Settings
    },
    {
        initialRouteName:'Dashboard'
    }
)

export default createAppContainer(dashboard)