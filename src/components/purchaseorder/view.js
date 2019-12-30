import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, Image, ActivityIndicator, SafeAreaView } from 'react-native';

import viewstyle from './styles/poview';

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
					<Text style={viewstyle.heading}>PO# - {this.state.rowdata.id}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Unit Number</Text>
							<Text style={viewstyle.righttext}>12345</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Equipment Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.equipment}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Subsidiary</Text>
							<Text style={viewstyle.righttext}>Tango Zulu</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Category</Text>
							<Text style={viewstyle.righttext}>Sample text</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Type</Text>
							<Text style={viewstyle.righttext}>General</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reporting Time</Text>
							<Text style={viewstyle.righttext}>9 Jul, 2019 12:30 PM</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Vendor name</Text>
							<Text style={viewstyle.righttext}>John Barrett</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Created by</Text>
							<Text style={viewstyle.righttext}>John Doe</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Assigned by</Text>
							<Text style={viewstyle.righttext}>John Doe</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Assigned to</Text>
							<Text style={viewstyle.righttext}>Neil Patrick</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.paragraph}>
							<Text style={viewstyle.longtextheading}>PO Notes</Text>
							<Text style={viewstyle.longtext}>
								Pellentesque habitant morbi tristique senectus etnete malesuada fames ac turpis egestas.
								Ut arcu liberotert
							</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.paragraph}>
							<Text style={viewstyle.longtextheading}>Vendor Notes</Text>
							<Text style={viewstyle.longtext}>
								Pellentesque habitant morbi tristique senectus etnete malesuada fames ac turpis egestas.
								Ut arcu liberotert
							</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.paragraph}>
							<Text style={viewstyle.longtextheading}>Issues</Text>
							<View style={viewstyle.row}>
								<Text style={viewstyle.leftissuetext}>3001</Text>
								<Text style={viewstyle.righttext}>Active</Text>
							</View>
							<View style={viewstyle.row}>
								<Text style={viewstyle.leftissuetext}>3004</Text>
								<Text style={viewstyle.righttext}>Incomplete</Text>
							</View>
							<View style={viewstyle.row}>
								<Text style={viewstyle.leftissuetext}>3143</Text>
								<Text style={viewstyle.righttext}>Complete</Text>
							</View>
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
