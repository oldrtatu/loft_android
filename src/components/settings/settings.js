import React from 'react';
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableWithoutFeedback,
	TextInput,
	TouchableOpacity,
	Modal,
	Switch
} from 'react-native';

import profile from '../../assets/profile.png';
import camera from '../../assets/camera.png';
import forward from '../../assets/forward.png';
import password from '../../assets/password.png';
import logout from '../../assets/logout.png';
import changepassword from '../../assets/changepassword.png';
import close from '../../assets/close.png';
import configure from '../../assets/configure.png'

import styles from './styles/style';
import modal from './styles/modalstyle';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.state = {
			visible: false,
			modal2: false,
			swtiches: [true,true,false,false,true],
			user_data: {
				username:"Yash"
			}
		};
	}
	array = ["Purchase Order","Notifications","Issues","Reports","Inventory"]

	todolist = () => {
		this.props.navigation.navigate('To Do List')
	}
	addPassword = () => {
		this.setState({ visible: true });
	};

	closePassword = () => {
		this.setState({ visible: false });
	};

	changepassword = () => {
		this.setState({ visible: false });
	};

	closeconfigure = () => {
		this.setState({modal2:false})
	}

	changeconfigure = () => {
		this.setState({modal2:false})
	}

	addconfigure = () => {
		this.setState({modal2:true})
	}

	changeswitch = (value,key) =>{
		let arr = [...this.state.swtiches]
		arr[key] = value
		this.setState({
			swtiches:arr
		})
	}

	render() {
		return (
			<ScrollView style={styles.containerStyle}>
				<View style={styles.topbar} />
				<View style={styles.restarea}>
					<TouchableWithoutFeedback>
						<View>
							<Image source={profile} style={styles.profileimage} />
							<Image source={camera} style={styles.camera} />
						</View>
					</TouchableWithoutFeedback>
					<View style={styles.firstformcomponent}>
						<Text style={styles.label}>First Name</Text>
						<TextInput style={styles.textinput} placeholder="Enter first name" value={this.state.user_data.username} />
					</View>
					<View style={styles.otherformcomponent}>
						<Text style={styles.label}>Last Name</Text>
						<TextInput style={styles.textinput} placeholder="Enter last name" defaultValue="Doe" />
					</View>
					<View style={styles.otherformcomponent}>
						<Text style={styles.label}>Email address</Text>
						<TextInput
							style={styles.textinput}
							placeholder="Enter email address"
							defaultValue="johndoe@gmail.com"
						/>
					</View>
					<View style={styles.separator} />
					<TouchableOpacity style={styles.navigator} onPress={this.addconfigure}>
						<Text style={styles.forwardtitle}>Customise dashboard</Text>
						<Image source={forward} style={styles.forwardarrow} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.navigator} onPress={this.todolist}>
						<Text style={styles.forwardtitle}>To do list</Text>
						<Image source={forward} style={styles.forwardarrow} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.password} onPress={this.addPassword}>
						<Text style={styles.passwordtitle}>Change Password   </Text>
						<Image source={password} style={styles.forwardarrow} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.logout} onPress={this.logout}>
						<Text style={styles.logouttitle}>Logout   </Text>
						<Image source={logout} style={styles.forwardarrow} />
					</TouchableOpacity>
				</View>
				<Modal animationType="fade" transparent={true} visible={this.state.visible}>
					<View style={modal.background} />
					<View style={modal.container}>
						<ScrollView>
							<TouchableOpacity style={modal.closemodal} onPress={this.closePassword}>
								<Image source={close} style={modal.closeimage} />
							</TouchableOpacity>
							<Image source={changepassword} style={modal.topimage} />
							<TextInput style={modal.passwordbox} secureTextEntry={true} placeholder="Enter current password" />
							<TextInput style={modal.passwordbox} secureTextEntry={true} placeholder="Enter new password" />
							<TextInput style={modal.passwordbox} secureTextEntry={true} placeholder="Confirm new password" />
							<TouchableOpacity style={modal.savebutton} onPress={this.changepassword}>
								<Text style={{ color: '#fff', alignSelf: 'center', fontSize: 17 }}>Save</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</Modal>
				<Modal animationType="fade" transparent={true} visible={this.state.modal2}>
					<View style={modal.background} />
					<View style={modal.container2}>
						<ScrollView>
							<TouchableOpacity style={modal.closemodal} onPress={this.closeconfigure}>
								<Image source={close} style={modal.closeimage} />
							</TouchableOpacity>
							<Image source={configure} style={modal.topimage} />
							{
								this.array.map((item,i) => (
									<View style={modal.slider} key={i}>
										<Text style={modal.text}>{item}</Text>
										<Switch
											onValueChange={(e)=> this.changeswitch(e,i)}
											value={this.state.swtiches[i]}
											style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
										/>
									</View>
								))
							}
							<TouchableOpacity style={modal.savebutton} onPress={this.changeconfigure}>
								<Text style={{ color: '#fff', alignSelf: 'center', fontSize: 17 }}>Save</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

export default Settings;
