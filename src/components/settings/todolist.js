import React from 'react';
import {
	Text,
	SafeAreaView,
	View,
	ImageBackground,
	TouchableOpacity,
	Image,
	Modal,
	ScrollView,
	TextInput
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from './styles/todolist';
import modal from './styles/modalstyle';

import topnav from '../../assets/topnav.png';
import forward from '../../assets/forward.png';
import close from '../../assets/close.png';

import { GlobalContext } from '../../provider';
import deleteimage from '../../assets/deleterow.png';
import { UIActivityIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';

class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.context.user_data,
			visible: false,
			newtask: '',
			adding: false
		};
	}
	componentDidMount() {
		this.setState({ user: this.props.context.user_data });
	}

	UNSAFE_componentWillReceiveProps(newprops) {
		let newuser = JSON.stringify(newprops.context.user_data);
		let currentuser = JSON.stringify(this.state.user);
		if (newuser != currentuser) {
			this.setState({
				user: newprops.context.user_data
			});
		}
	}

	viewTasks = (tasks) => {
		this.props.navigation.navigate('Tasks', { tasks });
	};

	addnewlist = async () => {
		if (this.state.newtask == '') {
			Snackbar.show({
				text: 'Enter new list name',
				backgroundColor: '#D62246',
				color: '#fff'
			});
		} else {
			this.setState({ adding: true });
			let data = { name: this.state.newtask, userId: this.state.user.id };
			let res = await this.props.context.addtodolist(data);
			if (res[0]) {
				this.setState({ adding: false, visible: false }, () => {
					setTimeout(() => {
						Snackbar.show({
							text: 'List added successfully',
							duration: Snackbar.LENGTH_SHORT,
							backgroundColor: '#1CA49F'
						});
					}, 400);
				});
			} else {
				this.setState({ adding: false });
				setTimeout(() => {
					Snackbar.show({
						text: res[1],
						duration: Snackbar.LENGTH_SHORT,
						backgroundColor: '#D62246'
					});
				}, 400);
			}
		}
	};

	deletetodo = async (item) => {
		let data= {id: item.id}
		let res = await this.props.context.deletetodolist(data);
		if (res[0]) {
			Snackbar.show({
				text: 'List deleted successfully',
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
							<TouchableOpacity style={styles.rowback} onPress={()=>this.deletetodo(data.item)}>
								<Image source={deleteimage} style={styles.deleteimage} />
							</TouchableOpacity>
						)}
					/>
				</View>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.newbutton}
					onPress={() => this.setState({ visible: true })}
				>
					<Text style={styles.newtext}>Create new list</Text>
				</TouchableOpacity>
				<Modal animationType="fade" transparent={true} visible={this.state.visible}>
					<View style={modal.background} />
					<View style={[ modal.container, { height: 230 } ]}>
						<ScrollView>
							<TouchableOpacity
								style={modal.closemodal}
								onPress={() => this.setState({ visible: false, newtask: '' })}
							>
								<Image source={close} style={modal.closeimage} />
							</TouchableOpacity>

							<TextInput
								style={styles.textinput}
								placeholder="Enter new list name"
								value={this.state.newtask}
								onChangeText={(text) => this.setState({ newtask: text })}
							/>

							{this.state.adding ? (
								<TouchableOpacity style={modal.savebutton} onPress={this.addnewlist}>
									<UIActivityIndicator color="#fff" size={20} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={modal.savebutton} onPress={this.addnewlist}>
									<Text style={{ color: '#fff', alignSelf: 'center', fontSize: 17 }}>Save</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
				</Modal>
			</React.Fragment>
		);
	}
}

const todolist = (props) => (
	<GlobalContext.Consumer>{(context) => <ToDoList context={context} {...props} />}</GlobalContext.Consumer>
);

export default todolist;
