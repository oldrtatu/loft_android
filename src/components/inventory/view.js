import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, Image, ActivityIndicator, SafeAreaView } from 'react-native';

import viewstyle from './styles/inventoryview';

import back from '../../assets/back.png';

class PurchaseOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowdata: null
		};
	}
	componentDidMount() {
		this.setState({ rowdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	changedata = (data) => {
		this.setState({ rowdata: { ...this.state.rowdata, ...data } });
	};

	editdata = () => {
		this.props.navigation.navigate('Form', { rowdata: this.state.rowdata, changedata: this.changedata });
	};

	convertdate = (date) => {
		let monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		let formatted = new Date(Date.parse(date));

		var hr = formatted.getHours();
		var min = formatted.getMinutes();
		var ampm = 'AM';
		if (hr > 12) {
			hr -= 12;
			ampm = 'PM';
		}
		formatted =
			monthNames[formatted.getMonth()] +
			' ' +
			formatted.getDate() +
			', ' +
			formatted.getFullYear() +
			' ' +
			hr +
			':' +
			min +
			' ' +
			ampm;
		return formatted;
	};

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={viewstyle.topbar}>
					<TouchableOpacity activeOpacity={1} style={viewstyle.backcontainer} onPress={this.goback}>
						<Image source={back} style={viewstyle.backimage} />
					</TouchableOpacity>
					<Text style={viewstyle.heading}>Inventory # - {this.state.rowdata.id.toString()}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Item name</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Item code</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.item.code}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Current Quantity</Text>
							<Text style={viewstyle.righttext}>{`${this.state.rowdata.currentQuantity} ${this.state
								.rowdata.item.quantityUnit}`}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Cost per item</Text>
							<Text style={viewstyle.righttext}>{`${this.state.rowdata.costPerItem} ${this.state
								.rowdata.costUnit}`}</Text>
						</View>
						{this.state.rowdata.vendor ? (
							<View style={viewstyle.row}>
								<Text style={viewstyle.lefttext}>Preferred vendor</Text>
								<Text style={viewstyle.righttext}>{this.state.rowdata.vendor.name}</Text>
							</View>
						) : null}
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Inventory check date</Text>
							<Text style={viewstyle.righttext}>{this.convertdate(this.state.rowdata.checkDate)}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reorder at</Text>
							<Text style={viewstyle.righttext}>{`${this.state.rowdata.reorderAt} ${this.state.rowdata
								.item.quantityUnit}`}</Text>
						</View>
					</View>
					{this.state.rowdata.notes ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Notes</Text>
									<Text style={viewstyle.longtext}>
										{this.state.rowdata.notes}
									</Text>
								</View>
							</View>
						</React.Fragment>
					) : null}
				</ScrollView>
				<TouchableOpacity activeOpacity={1} style={viewstyle.editbutton} onPress={this.editdata}>
					<Text style={viewstyle.editbuttontext}>Edit</Text>
				</TouchableOpacity>
			</React.Fragment>
		) : (
			<ActivityIndicator />
		);
	}
}

export default PurchaseOrder;
