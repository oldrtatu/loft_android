import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import issues from '../components/issues/datatable'
import ViewIssues from '../components/issues/view'
import IssueForm from '../components/issues/form'
import AddForm from '../components/issues/addform'

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
        },
        Form:{
            screen:IssueForm,
            navigationOptions:{
                header:null
            }
        },
        AddForm:{
            screen:AddForm,
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