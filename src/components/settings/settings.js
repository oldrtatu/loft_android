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
	Switch,
	Dimensions,
	Platform
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import camera from '../../assets/camera.png';
import forward from '../../assets/forward.png';
import password from '../../assets/password.png';
import logout from '../../assets/logout.png';
import changepassword from '../../assets/changepassword.png';
import close from '../../assets/close.png';
import configure from '../../assets/configure.png';

import styles from './styles/style';
import modal from './styles/modalstyle';

import { GlobalContext } from '../../provider';
import Snackbar from 'react-native-snackbar';
import { UIActivityIndicator } from 'react-native-indicators';
import ImagePicker from 'react-native-image-picker';

const options = {
	title: 'Select profile pic',
	storageOptions: {
		skipBackup: false,
		path: 'images'
	},
	allowsEditing: true
};

class Settings extends React.Component {
	constructor(props) {
		super(props);
		let val = props.context.user_data.dashboardConfig.toString();
		val = val.split('');
		for (let i = 0; i < val.length; i++) {
			if (val[i] == '1') {
				val[i] = true;
			} else {
				val[i] = false;
			}
		}
		this.state = {
			visible: false,
			modal2: false,
			swtiches: val,
			user_data: props.context.user_data,
			passworderror: '',
			passwordloading: false,
			dashboardloading: false,
			loading: false,
			password: {
				current: '',
				new: '',
				confirm: ''
			}
		};
	}
	array = [ 'Purchase Order', 'Notifications', 'Issues', 'Reports', 'Inventory' ];

	todolist = () => {
		this.props.navigation.navigate('To Do List');
	};

	addPassword = () => {
		this.setState({ visible: true });
	};

	closePassword = () => {
		this.setState({ visible: false });
	};

	changepassword = async () => {
		if (this.state.password.current == '') {
			this.setState({ passworderror: 'Enter current password' });
		} else if (this.state.password.new == '') {
			this.setState({ passworderror: 'Enter new password' });
		} else if (this.state.password.confirm == '') {
			this.setState({ passworderror: 'Confirm new password' });
		} else if (this.state.password.new != this.state.password.confirm) {
			this.setState({ passworderror: "New password doesn't match" });
		} else {
			this.setState({
				passwordloading: true
			});
			let res = await this.props.context.changepassword({
				newPassword: this.state.password.new,
				currentPassword: this.state.password.current
			});
			if (res[0]) {
				this.setState({ visible: false, passwordloading: false }, () => {
					setTimeout(() => {
						Snackbar.show({
							text: 'Password changed successfully',
							duration: Snackbar.LENGTH_SHORT,
							backgroundColor: '#1CA49F'
						});
					}, 400);
				});
			} else {
				this.setState({ passworderror: res[1], passwordloading: false });
			}
		}
	};

	closeconfigure = () => {
		this.setState({ modal2: false });
	};

	changeconfigure = async () => {
		this.setState({
			dashboardloading: true
		});
		let val = '';
		for (let i = 0; i < this.state.swtiches.length; i++) {
			if (this.state.swtiches[i]) {
				val += '1';
			} else {
				val += '0';
			}
		}
		let res = await this.props.context.changeuserdata(
			{
				dashboardConfig: val,
				id: this.state.user_data.id,
				uid: this.state.user_data.uid
			},
			'dashboardConfig'
		);
		if (res[0]) {
			this.setState(
				{ modal2: false, dashboardloading: false, user_data: { ...this.state.user_data, ...res[1] } },
				() => {
					setTimeout(() => {
						Snackbar.show({
							text: 'Configuration changed successfully',
							duration: Snackbar.LENGTH_SHORT,
							backgroundColor: '#1CA49F'
						});
					}, 400);
				}
			);
		} else {
			this.setState({ dashboardloading: false });
		}
	};

	addconfigure = () => {
		this.setState({ modal2: true });
	};

	changeswitch = (value, key) => {
		let arr = [ ...this.state.swtiches ];
		arr[key] = value;
		this.setState({
			swtiches: arr
		});
	};

	logout = () => {
		AsyncStorage.removeItem('_token')
		AsyncStorage.removeItem('_user')
		this.props.navigation.navigate('Sign In');
	};

	changeuserdata = async (key, toshow) => {
		let value = this.state.user_data[key];
		if (value != this.props.context.user_data[key]) {
			if (value != '') {
				let data = {};
				data[key] = value;
				(data['id'] = this.state.user_data.id), (data['uid'] = this.state.user_data.uid);
				let res = await this.props.context.changeuserdata(data, key);
				if (res[0]) {
					this.setState({ user_data: { ...this.state.user_data, ...res[1] },loading:false }, () => {
						setTimeout(() => {
							Snackbar.show({
								text: toshow + ' changed successfully',
								duration: Snackbar.LENGTH_SHORT,
								backgroundColor: '#1CA49F'
							});
						}, 400);
					});
				} else {
					this.setState({loading:false})
					setTimeout(() => {
						Snackbar.show({
							text: res[1],
							duration: Snackbar.LENGTH_SHORT,
							backgroundColor: '#D62246'
						});
					}, 400);
				}
			} else {
				this.setState({loading:false})
				setTimeout(() => {
					Snackbar.show({
						text: 'Can not leave ' + toshow + ' empty',
						duration: Snackbar.LENGTH_SHORT,
						backgroundColor: '#D62246'
					});
				}, 400);
			}
		}
	};

	addprofilepic = () => {
		ImagePicker.showImagePicker(options, async (res) => {
			let err = '';
			if (res.didCancel) {
				err = 'You cancelled image picking';
			} else if (res.error) {
				err = res.error;
			} else {
				this.setState({loading:true})
				await this.props.context
					.uploaduserimage(this.props.context.url, this.props.context.token, res)
					.then((res) => {
						this.setState(
							{
								user_data: { ...this.state.user_data, profile: res.url }
							},
							() => this.changeuserdata('profile', 'Image')
						);
					})
					.catch((error) => {
						err = error.message;
					});
			}
			if (err != '') {
				Snackbar.show({
					text: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
			}
		});
	};

	render() {
		return (
			<ScrollView style={styles.containerStyle}>
				<Modal animationType="fade" transparent={true} visible={this.state.loading}>
					<View style={modal.background} />
					<View style={{position:"absolute",top:0,justifyContent:"center",width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
						<UIActivityIndicator color="#fff" size={50} />
					</View>
				</Modal>
				<View style={styles.topbar} />
				<View style={styles.restarea}>
					<TouchableOpacity activeOpacity={1} onPress={this.addprofilepic}>
						<View>
							<Image
								source={{
									uri: this.props.context.url + this.state.user_data.profile,
									headers: {
										Authorization: `Bearer ${this.props.context.token}`
									},
									method: 'GET'
								}}
								style={styles.profileimage}
							/>
							<Image source={camera} style={styles.camera} />
						</View>
					</TouchableOpacity>
					<View style={styles.firstformcomponent}>
						<Text style={styles.label}>First Name</Text>
						<TextInput
							style={styles.textinput}
							placeholder="Enter first name"
							value={this.state.user_data.firstName}
							onChangeText={(text) =>
								this.setState({ user_data: { ...this.state.user_data, firstName: text } })}
							onBlur={() => this.changeuserdata('firstName', 'First name')}
						/>
					</View>
					<View style={styles.otherformcomponent}>
						<Text style={styles.label}>Last Name</Text>
						<TextInput
							style={styles.textinput}
							placeholder="Enter last name"
							value={this.state.user_data.lastName}
							onChangeText={(text) =>
								this.setState({ user_data: { ...this.state.user_data, lastName: text } })}
							onBlur={() => this.changeuserdata('lastName', 'Last name')}
						/>
					</View>
					<View style={styles.otherformcomponent}>
						<Text style={styles.label}>Email address</Text>
						<TextInput
							style={styles.textinput}
							placeholder="Enter email address"
							value={this.state.user_data.email}
							onChangeText={(text) =>
								this.setState({ user_data: { ...this.state.user_data, email: text } })}
							onBlur={() => this.changeuserdata('email', 'Email address')}
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
						<Text style={styles.passwordtitle}>{`Change Password   `}</Text>
						<Image source={password} style={styles.forwardarrow} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.logout} onPress={this.logout}>
						<Text style={styles.logouttitle}>{'Logout  '} </Text>
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
							<TextInput
								style={modal.passwordbox}
								secureTextEntry={true}
								placeholder="Enter current password"
								value={this.state.password.current}
								onChangeText={(text) =>
									this.setState({ password: { ...this.state.password, current: text } })}
							/>
							<TextInput
								style={modal.passwordbox}
								secureTextEntry={true}
								placeholder="Enter new password"
								value={this.state.password.new}
								onChangeText={(text) =>
									this.setState({ password: { ...this.state.password, new: text } })}
							/>
							<TextInput
								style={modal.passwordbox}
								secureTextEntry={true}
								placeholder="Confirm new password"
								value={this.state.password.confirm}
								onChangeText={(text) =>
									this.setState({ password: { ...this.state.password, confirm: text } })}
							/>
							{this.state.passworderror != undefined && this.state.passworderror != '' ? (
								<Text style={styles.error}>{this.state.passworderror}</Text>
							) : null}
							{this.state.passwordloading ? (
								<TouchableOpacity style={modal.savebutton} onPress={this.changepassword}>
									<UIActivityIndicator color="#fff" size={20} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={modal.savebutton} onPress={this.changepassword}>
									<Text style={{ color: '#fff', alignSelf: 'center', fontSize: 17 }}>Save</Text>
								</TouchableOpacity>
							)}
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
							{this.array.map((item, i) => (
								<View style={modal.slider} key={i}>
									<Text style={modal.text}>{item}</Text>
									<Switch
										onValueChange={(e) => this.changeswitch(e, i)}
										value={this.state.swtiches[i]}
										style={Platform.OS =='ios' ? { transform: [ { scaleX: 0.6 }, { scaleY: 0.6 } ] }:{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
									/>
								</View>
							))}
							{this.state.dashboardloading ? (
								<TouchableOpacity style={modal.savebutton} onPress={this.changeconfigure}>
									<UIActivityIndicator color="#fff" size={20} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={modal.savebutton} onPress={this.changeconfigure}>
									<Text style={{ color: '#fff', alignSelf: 'center', fontSize: 17 }}>Save</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

const ExportSetting = (props) => (
	<GlobalContext.Consumer>{(context) => <Settings context={context} {...props} />}</GlobalContext.Consumer>
);

export default ExportSetting;
