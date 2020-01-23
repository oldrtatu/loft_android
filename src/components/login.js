import React from 'react';
import {  View, ImageBackground, TextInput, Text, TouchableOpacity,Modal,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { UIActivityIndicator } from 'react-native-indicators';

import login from '../assets/login.png';
import styles from './styles/login';

import { withGlobalContext } from '../provider';

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_data: props.global.user_data,
			loading: false,
			uploading:false
		};
	}

	componentDidMount(){
		this.checkSavedLogin()
	}

	checkSavedLogin = async() =>{
		this.setState({uploading:true})
		let token = await AsyncStorage.getItem('_token')
		if(token != null && token != undefined){
			let user = await AsyncStorage.getItem('_user')
			this.setState({
				user_data: JSON.parse(user), token: token, authenticated: true,uploading:false
			},()=>{
				this.props.global.checklogin(this.state.user_data,token)
				this.props.navigation.navigate('App')
			})
		}else{
			this.setState({uploading:false})
		}
	}

	checkLogin = async () => {
		this.setState({
			loading: true
		});
		if (this.state.user_data.username == '' || this.state.user_data.password == '') {
			this.setState({
				user_data: { ...this.state.user_data, error: 'Fill the details' },
				loading: false
			});
		} else {
			let res = await this.props.global.login(this.state.user_data.username, this.state.user_data.password);
			if (res[0] == false) {
				this.setState({ user_data: { ...this.state.user_data, error: res[1] }, loading: false });
			} else {
				this.props.navigation.navigate('App');
			}
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={login} style={styles.background}>
					<TextInput
						style={styles.textinput}
						placeholder="Enter username"
						defaultValue={this.state.user_data.username}
						onChangeText={(text) =>
							this.setState({ user_data: { ...this.state.user_data, username: text } })}
					/>
					<TextInput
						style={styles.textinput}
						placeholder="Enter password"
						secureTextEntry={true}
						defaultValue={this.state.user_data.password}
						onChangeText={(text) =>
							this.setState({ user_data: { ...this.state.user_data, password: text } })}
					/>
					{this.state.user_data.error != undefined && this.state.user_data.error != '' ? (
						<Text style={styles.error}>{this.state.user_data.error}</Text>
					) : null}
					{this.state.loading ? (
						<TouchableOpacity style={styles.button} activeOpacity={1}>
							<UIActivityIndicator color="#fff" size={30} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.button} onPress={this.checkLogin}>
							<Text style={{ fontSize: 17 }}>Sign In</Text>
						</TouchableOpacity>
					)}
				</ImageBackground>

				<Modal animated={false} visible={this.state.uploading} transparent={true}>
					<View
						style={{
							backgroundColor: '#000',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height,
							opacity: 0.7
						}}
					/>
					<View
						style={{
							position: 'absolute',
							top: 0,
							justifyContent: 'center',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height
						}}
					>
						<UIActivityIndicator color="#fff" size={50} />
					</View>
				</Modal>
			</View>
		);
	}
}

export default withGlobalContext(LogIn);
