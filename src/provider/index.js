import React from 'react';

const GlobalContext = React.createContext();

import { loginuser,change_password, change_userdata,upload_user_image } from './login';

export class GlobalContextProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_data: {
				username: 'yashmalik23@gmail.com',
				password: '12345678',
				error: ''
			},
			authenticated: false,
			url:"http://xplicitsoftware.co:8080"
		};
	}

	login = (username, password) => {
		return new Promise(async (resolve, reject) => {
			await loginuser(this.state.url,username, password)
			.then(res=>{
				this.setState({ user_data: res.user, token: res.token, authenticated: true }, () => {
					resolve([this.state.authenticated,this.state.user_data.error]);
				})
			})
			.catch((err) =>
				this.setState({ user_data: { ...this.state.user_data, error: err.message } }, () => {
					resolve([this.state.authenticated,this.state.user_data.error]);
				})
			);
		});
	};

	changepassword = (data) => {
		return new Promise(async (resolve, reject) => {
			await change_password(this.state.url,this.state.token, data)
			.then(res=>{
				this.setState({ token: res.token, authenticated: true }, () => {
					resolve([true]);
				})
			})
			.catch((err) =>
				resolve([false,err.message])
			)
		})
	}

	changeuserdata = (data,key) => {
		return new Promise(async (resolve, reject) => {
			await change_userdata(this.state.url,this.state.token, data)
			.then(res=>{
				let user_data = {...this.state.user_data}
				user_data[key] = res.response[key]
				resolve([true,res])
				this.setState({ user_data }, () => {
					resolve([true,res.response]);
				})
			})
			.catch((err) =>
				resolve([false,err.message])
			)
		})
	}

	render() {
		return (
			<GlobalContext.Provider
				value={{
					...this.state,
					login: this.login,
					changepassword: this.changepassword,
					changeuserdata:this.changeuserdata,
					uploaduserimage: upload_user_image
				}}
			>
				{this.props.children}
			</GlobalContext.Provider>
		);
	}
}

// create the consumer as higher order component
export const withGlobalContext = (ChildComponent) => (props) => (
	<GlobalContext.Consumer>{(context) => <ChildComponent {...props} global={context} />}</GlobalContext.Consumer>
);

export {GlobalContext}
