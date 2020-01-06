import React from 'react';

const GlobalContext = React.createContext();

import { loginuser } from './login';

export class GlobalContextProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_data: {
				username: 'yashmalik23@gmail.com',
				password: '12345678',
				error: ''
			},
			authenticated: false
		};
	}

	login = (username, password) => {
		return new Promise(async (resolve, reject) => {
			await loginuser(username, password)
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

	render() {
		return (
			<GlobalContext.Provider
				value={{
					...this.state,
					login: this.login
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
