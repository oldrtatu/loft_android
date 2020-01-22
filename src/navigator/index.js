import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LogIn from "../components/login";
import MainApp from "./bottomnavigator";
import Recorder from '../components/recorder';



const AppNavigator = createSwitchNavigator(
    {
        'Sign In':{
            screen: Recorder
        },
        'App': MainApp
    },
    {
        initialRouteName: 'Sign In'
    }
);

export default createAppContainer(AppNavigator);