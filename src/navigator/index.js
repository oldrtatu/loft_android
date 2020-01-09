import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LogIn from "../components/login";
import MainApp from "./bottomnavigator";
import Todolist from '../components/settings/todolist'


const AppNavigator = createSwitchNavigator(
    {
        'Sign In':{
            screen: Todolist
        },
        'App': MainApp
    },
    {
        initialRouteName: 'Sign In'
    }
);

export default createAppContainer(AppNavigator);