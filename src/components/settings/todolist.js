import React from 'react';
import { Text, SafeAreaView, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from './styles/todolist';

import topnav from '../../assets/topnav.png';
import forward from '../../assets/forward.png';

import { GlobalContext } from '../../provider';
import deleteimage from '../../assets/deleterow.png';

class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.context.user_data
		};
	}
	componentDidMount() {
		this.setState({ user: this.props.context.user_data });
	}

	viewTasks = (tasks) => {
		this.props.navigation.navigate('Tasks', { tasks });
	};

	render() {
		const user = this.state.user;
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={{ flex: 1, backgroundColor: '#f6f7f9' }}>
					<View style={styles.containerStyle}>
						<View style={styles.topbar}>
							<ImageBackground source={topnav} style={styles.background}>
								<Text style={styles.username}>Hello! {`${user.firstName} ${user.lastName}`}</Text>
								<Text style={styles.username}>Here is a list of things to do</Text>
							</ImageBackground>
						</View>
					</View>
					<SwipeListView
						data={user.todos}
						renderItem={(data) => (
							<TouchableOpacity
								activeOpacity={1}
								style={styles.row}
								onPress={() => this.viewTasks(data.item)}
							>
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
				</View>
				<TouchableOpacity activeOpacity={0.7} style={styles.newbutton} onPress={()=>this.viewTasks({name:'',tasks:[]})}>
					<Text style={styles.newtext}>Create new list</Text>
				</TouchableOpacity>
			</React.Fragment>
		);
	}
}

const todolist = (props) => (
	<GlobalContext.Consumer>{(context) => <ToDoList context={context} {...props} />}</GlobalContext.Consumer>
);

export default todolist;
