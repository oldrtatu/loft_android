import React from 'react';
import { Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';

import { GlobalContext } from '../../provider';
import { InputField } from '../helpers';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles/todolist';
import deleteimage from '../../assets/deleterow.png';

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: {
				name: '',
				tasks: []
			}
		};
	}

	componentDidMount() {
		this.setState(
			{
				list: this.props.navigation.getParam('tasks')
			}
		);
	}

	getValue = (key, value) => {
		let ob = { ...this.state.list };
		ob[key] = value;
		this.setState({ list: ob });
	};

	addTask = () => {
		this.props.navigation.navigate('Add',{addnew:true})
    };

    viewTask = (data) =>{
        this.props.navigation.navigate('Add',{addnew:false,data})
    }

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<ScrollView>
					<InputField
						placeholder="Enter list name"
						label="List Name"
						value={this.state.list.name}
						validate={[ 'empty' ]}
						name="name"
						getValue={this.getValue}
						editable={true}
					/>
				</ScrollView>
				<SwipeListView
					data={this.state.list.tasks}
					renderItem={(data) => (
						<TouchableOpacity activeOpacity={1} style={styles.row} onPress={() => this.viewTask(data.item)}>
							<Text style={styles.text}>{data.item.name}</Text>
							<Image style={styles.forward} source={forward} />
						</TouchableOpacity>
					)}
					keyExtractor={(data) => data.id.toString()}
					style={styles.liststyle}
					leftOpenValue={50}
					renderHiddenItem={(data) => (
						<TouchableOpacity style={styles.rowback}>
							<Image source={deleteimage} style={styles.deleteimage} />
						</TouchableOpacity>
					)}
				/>
				<TouchableOpacity activeOpacity={0.7} style={styles.newbutton} onPress={()=>this.addTask({name:'',tasks:[]})}>
					<Text style={styles.newtext}>Add new tasks</Text>
				</TouchableOpacity>
			</React.Fragment>
		);
	}
}

const tasks = (props) => (
	<GlobalContext.Consumer>{(context) => <Tasks context={context} {...props} />}</GlobalContext.Consumer>
);
export default tasks;
