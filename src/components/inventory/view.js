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

	editdata = () => {
		this.props.navigation.navigate('Form', {rowdata:this.state.rowdata})
	}

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
				<View style={viewstyle.topbar}>
					<TouchableOpacity activeOpacity={1} style={viewstyle.backcontainer} onPress={this.goback}>
						<Image source={back} style={viewstyle.backimage} />
					</TouchableOpacity>
					<Text style={viewstyle.heading}>Item name - {this.state.rowdata.name}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Item name</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Item code</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.code}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Current Quantity</Text>
							<Text style={viewstyle.righttext}>125 pieces</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Preferred vendor</Text>
							<Text style={viewstyle.righttext}>John Barrett</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Inventory check date</Text>
							<Text style={viewstyle.righttext}>6 Jan,2020</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reorder at</Text>
							<Text style={viewstyle.righttext}>100 pieces</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.paragraph}>
							<Text style={viewstyle.longtextheading}>Notes</Text>
							<Text style={viewstyle.longtext}>
								Pellentesque habitant morbi tristique senectus etnete malesuada fames ac turpis egestas.
								Ut arcu liberotert
							</Text>
						</View>
					</View>
				</ScrollView>
				<TouchableOpacity activeOpacity={1} style={viewstyle.editbutton} onPress={this.editdata}>
					<Text style={viewstyle.editbuttontext}>Tap to Edit</Text>
				</TouchableOpacity>
			</React.Fragment>
		) : (
			<ActivityIndicator />
		);
	}
}

export default PurchaseOrder;
