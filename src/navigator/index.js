import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LogIn from "../components/login";
import MainApp from "./bottomnavigator";


const AppNavigator = createSwitchNavigator(
    {
        'Sign In':{
            screen: LogIn
        },
        'App': MainApp
    },
    {
        initialRouteName: 'App'
    }
);

export default createAppContainer(AppNavigator);