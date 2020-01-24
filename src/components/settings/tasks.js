import React from 'react';
import { Text, TouchableOpacity, Image, SafeAreaView, ScrollView, View, Dimensions } from 'react-native';

import forward from '../../assets/forward.png';
import close from '../../assets/close.png';

import { GlobalContext } from '../../provider';
import { InputField } from '../helpers';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles/todolist';
import deleteimage from '../../assets/deleterow.png';
import Snackbar from 'react-native-snackbar';

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
			},
			() => console.log(this.state.list)
		);
	}

	getValue = (key, value) => {
		let ob = { ...this.state.list };
		ob[key] = value;
		this.setState({ list: ob });
	};

	addTask = () => {
		this.props.navigation.navigate('Add', { addTask: this.addnewTask });
	};

	addnewTask = async (data) => {
		data['todoId'] = this.state.list.id;
		let res = await this.props.context.add_task(data,data.todoId);
		if (res[0]) {
			let tasks = [...this.state.list.tasks]
			tasks.push(res[1].response)
			this.setState({ list: {...this.state.list, tasks}  });
			Snackbar.show({
				text: 'Task added successfully',
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#1CA49F'
			});
		} else {
			Snackbar.show({
				text: res[1],
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#D62246'
			});
		}
	};

	deleteTask = async (item) => {
		let data= {id: item.id}
		let res = await this.props.context.delete_task(data,this.state.list.id);
		if (res[0]) {
			let tasks = [...this.state.list.tasks]
			for(let i in tasks){
				if(tasks[i].id == item.id){
					tasks.splice(i,1)
					break
				}
			}
			this.setState({
				list:{
					...this.state.list,
					tasks
				}
			})
			Snackbar.show({
				text: 'Task deleted successfully',
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#1CA49F'
			});
		} else {
			Snackbar.show({
				text: res[1],
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#D62246'
			});
		}
	};

	viewTask = (data) => {
		this.props.navigation.navigate('ViewTask', { rowdata: data });
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={{ height: 100 }}>
					<InputField
						placeholder="Enter list name"
						label="List Name"
						value={this.state.list.name}
						validate={[ 'empty' ]}
						name="name"
						getValue={this.getValue}
						editable={false}
					/>
				</View>
				<View
					style={{
						height: this.state.list.tasks.length * 70
					}}
				>
					<SwipeListView
						data={this.state.list.tasks}
						renderItem={(data) => (
							<TouchableOpacity
								activeOpacity={1}
								style={[styles.row,{backgroundColor:"#f0f0f0"}]}
								onPress={() => this.viewTask(data.item)}
							>
								<Text style={styles.text}>{data.item.name}</Text>
								<Image style={styles.forward} source={forward} />
							</TouchableOpacity>
						)}
						keyExtractor={(data) => data.id.toString()}
						style={{
							width: Dimensions.get('window').width * 0.85,
							alignSelf: 'center'
						}}
						leftOpenValue={50}
						renderHiddenItem={(data) => (
							<TouchableOpacity style={styles.rowback} onPress={()=>this.deleteTask(data.item)}>
								<Image source={deleteimage} style={styles.deleteimage} />
							</TouchableOpacity>
						)}
					/>
				</View>
				<TouchableOpacity activeOpacity={0.7} style={styles.newbutton} onPress={() => this.addTask()}>
					<Text style={styles.newtext}>Add new task</Text>
				</TouchableOpacity>
			</React.Fragment>
		);
	}
}

const tasks = (props) => (
	<GlobalContext.Consumer>{(context) => <Tasks context={context} {...props} />}</GlobalContext.Consumer>
);
export default tasks;
