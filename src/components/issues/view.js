import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, Image, ActivityIndicator, SafeAreaView } from 'react-native';

import viewstyle from './styles/issuesview';

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
					<Text style={viewstyle.heading}>Issue# - {this.state.rowdata.id}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Title</Text>
							<Text style={viewstyle.righttext}>Axel damaged</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Unit number</Text>
							<Text style={viewstyle.righttext}>12345</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Subsidiary</Text>
							<Text style={viewstyle.righttext}>Tango Zulu</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Category</Text>
							<Text style={viewstyle.righttext}>Sample text</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Equipment Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.equipment}</Text>
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
							<Text style={viewstyle.lefttext}>PO #</Text>
							<Text style={viewstyle.righttext}>--</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reported on</Text>
							<Text style={viewstyle.righttext}>06 May, 2019</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Posted on</Text>
							<Text style={viewstyle.righttext}>06 May, 2019</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Due on</Text>
							<Text style={viewstyle.righttext}>21 May, 2019</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Period</Text>
							<Text style={viewstyle.righttext}>3 months</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Odometer</Text>
							<Text style={viewstyle.righttext}>92344 miles</Text>
						</View>
						<View style={viewstyle.paragraph}>
							<Text style={viewstyle.longtextheading}>Description</Text>
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
