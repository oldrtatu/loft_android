import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import issues from '../components/issues/datatable'
import ViewIssues from '../components/issues/view'

const issue = createStackNavigator(
    {
        Issues:{
            screen:issues,
            navigationOptions:{
                header:null
            }
        },
        View:{
            screen: ViewIssues,
            navigationOptions:{
                header:null
            }
        }
    },
    {
        initialRouteName:'Issues',
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

export default issue;