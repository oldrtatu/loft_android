import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Sett from '../components/settings/settings'
import ToDo from '../components/settings/todolist'

import Settingsheader from '../components/navigation/settingheader'

const navigator = createStackNavigator(
    {
        Settings:{
            screen: Sett,
            navigationOptions:{
                header: (props) => <Settingsheader {...props} />
            }
        },
        "To Do List":{
            screen:ToDo,
            navigationOptions:{
                header: (props) => <Settingsheader {...props} />
            }
        }
    },
    {
        initialRouteName:"Settings"
    }
)

export default navigator