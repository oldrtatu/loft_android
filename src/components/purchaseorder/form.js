import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

import form from './styles/formstyle';

import back from '../../assets/back.png';

class POForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editdata: null,
			formnumber: 1
		};
	}

	componentDidMount() {
		this.setState({ editdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		if (this.state.formnumber == 1) {
			this.props.navigation.goBack(null);
		} else {
			this.setState({ formnumber: this.state.formnumber - 1 });
		}
	};

	setValue = (field, value) => {
		let ob = { ...this.addeddata };
		ob[field] = value;
		this.addeddata = ob;
	};

	handleSubmit = () => {
		if (this.state.formnumber == 4) {
			console.log(this.addeddata);
		} else {
			this.setState({ formnumber: this.state.formnumber + 1 });
		}
	};

	render() {
		return (
			<React.Fragment>
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>
						{this.state.editdata != null ? this.state.editdata.id : 'Add Purchase order'}
					</Text>
				</View>
				<ScrollView style={form.mainform} nestedScrollEnabled={true}>
					<Text style={form.partnumber}>{this.state.formnumber}/4  </Text>
				</ScrollView>
				{this.state.formnumber == 4 ? (
					<Slidebutton submit={this.handleSubmit} />
				) : (
					<TouchableOpacity activeOpacity={1} style={form.editbutton} onPress={this.handleSubmit}>
						<Text style={form.editbuttontext}>Next</Text>
					</TouchableOpacity>
				)}
			</React.Fragment>
		);
	}
}

export default POForm