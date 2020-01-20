import React from 'react';

const GlobalContext = React.createContext();

import { loginuser, change_password, change_userdata, upload_user_image } from './login';
import { fetch_data } from './fetchdata';
import { update_data, add_data } from './updatedata';
import { convertdata } from '../components/helpers/convertdata';

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
			url: 'http://xplicitsoftware.co:8080'
		};
	}

	login = (username, password) => {
		return new Promise(async (resolve, reject) => {
			await loginuser(this.state.url, username, password)
				.then((res) => {
					this.setState({ user_data: res.user, token: res.token, authenticated: true }, () => {
						resolve([ this.state.authenticated, this.state.user_data.error ]);
					});
				})
				.catch((err) =>
					this.setState({ user_data: { ...this.state.user_data, error: err.message } }, () => {
						resolve([ this.state.authenticated, this.state.user_data.error ]);
					})
				);
		});
	};

	changepassword = (data) => {
		return new Promise(async (resolve, reject) => {
			await change_password(this.state.url, this.state.token, data)
				.then((res) => {
					this.setState({ token: res.token, authenticated: true }, () => {
						resolve([ true ]);
					});
				})
				.catch((err) => resolve([ false, err.message ]));
		});
	};

	changeuserdata = (data, key) => {
		return new Promise(async (resolve, reject) => {
			await change_userdata(this.state.url, this.state.token, data)
				.then((res) => {
					let user_data = { ...this.state.user_data };
					user_data[key] = res.response[key];
					resolve([ true, res ]);
					this.setState({ user_data }, () => {
						resolve([ true, res.response ]);
					});
				})
				.catch((err) => resolve([ false, err.message ]));
		});
	};

	fetchdata = async () => {
		let arr = [
			{ path: '/po/issue', key: 'issuesdata' },
			{ path: '/po/po', key: 'podata' },
			{ path: '/archive/truck', key: 'truckdata' },
			{ path: '/archive/class', key: 'categorydata' },
			{ path: '/archive/item', key:'itemdata'},
			{ path: '/po/inventory', key: 'inventorydata'},
			{ path: '/archive/vendor', key: 'vendordata'}
		];
		for (let i in arr) {
			let item = arr[i];
			let res = await fetch_data(this.state.url, this.state.token, item.path);
			if (res.message) {
				console.log(res);
			} else {
				if (item.key == 'issuesdata') {
					let ob = convertdata(res);
					this.setState({ issuesdata: ob });
				} else if (item.key == 'podata') {
					this.setState({ podata: res });
				} else if (item.key == 'truckdata') {
					this.setState({ truckdata: res });
				} else if (item.key == 'categorydata') {
					this.setState({ categorydata: res });
				} else if (item.key == 'itemdata') {
					this.setState({ itemdata: res });
				} else if (item.key == 'vendordata') {
					this.setState({ vendordata: res });
				} else if (item.key == 'inventorydata') {
					let ob = convertdata(res);
					this.setState({ inventorydata: ob });
				}
			}
		}
	};

	updatedata = async (path, table, data) => {
		delete data['index'];
		let res = await update_data(this.state.url, this.state.token, path, data);
		if (res.message) {
			console.log(res);
		} else {
			let ob = { ...this.state[table] };
			console.log(data,"hey")
			ob[data.id] = { ...ob[data.id], ...data };
			if (table == 'issuesdata') {
				this.setState({ issuesdata: ob });
			}else if (table == 'inventorydata') {
				this.setState({ inventorydata: ob });
			}else if(table == 'podata'){
				this.setState({ podata: ob });
			}

		}
	};
	adddata = async (path, table, data) => {
		let res = await add_data(this.state.url, this.state.token, path, data);
		if (res.message) {
			console.log(res);
		} else {
			let ob = { ...this.state[table] };
			ob[res.id] = { ...res };
			if (table == 'issuesdata') {
				ob[res.id]["division"] = {...data["division"]}
				ob[res.id]["category"] = data["category"]
				ob[res.id][data.equipmentType.toLowerCase()] = data[data.equipmentType.toLowerCase()]
				this.setState({ issuesdata: ob });
			}else if (table == 'inventorydata') {
				ob[res.id]["item"] = data["item"]
				ob[res.id]["vendor"] = data["vendor"]
				this.setState({ inventorydata: ob });
			}else if (table == 'podata') {
				console.log(res)
				ob[res.id] = {...res,...data}
				let issuesdata = {...this.state.issuesdata}
				if(data.poType == 'ISSUES'){
					for(let i in data.issues){
						let issue = data.issues[i]
						issuesdata[issue.id]['POId'] = res.id
					}
				}
				this.setState({ podata: ob,issuesdata });
			}
		}
	};

	render() {
		return (
			<GlobalContext.Provider
				value={{
					...this.state,
					login: this.login,
					changepassword: this.changepassword,
					changeuserdata: this.changeuserdata,
					uploaduserimage: upload_user_image,
					fetchdata: this.fetchdata,
					updatedata: this.updatedata,
					adddata: this.adddata
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

export { GlobalContext };
