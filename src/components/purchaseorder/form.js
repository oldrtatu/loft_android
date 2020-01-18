import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

import form from './styles/formstyle';

import DropDown from '../helpers/DropDown'
import DatePicker from '../helpers/DatePicker'


import back from '../../assets/back.png';

class POForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editdata: null,
            formnumber: 2,
            equipment:'truck',
            potype:'general'
		};
    }
    
    data = {
		truck: truckdata,
		trailer: trailerdata
	};

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
    
    setEquipment = (field, value) => {
		this.setValue(field, value);
		this.setState({ equipment: value.toLowerCase(), override: true });
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
                    {this.state.formnumber == 1 && (
						<React.Fragment>
							<DropDown
								label="Equipment Type"
								name="equipment"
								value="Select"
								dropdown={[ 'Truck', 'Trailer' ]}
								setValue={this.setEquipment}
							/>
							{/* <SuggestionField
								label="Unit number"
								placeholder="Enter unit number"
								list={this.data[this.state.equipment]}
								startSuggestingFrom={1}
								inputStyle={form.input}
								suggestBoxStyle={form.suggestbox}
								setValue={this.setValue}
								field="id"
								addfield="unitNo"
								changeOverRide={() => this.setState({ override: false })}
								override={this.state.override}
							/> */}
							<Text style={[ form.label, { marginTop: 20 } ]}>Category</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter category" />
							<Text style={[ form.label, { marginTop: 20 } ]}>Subsidiary</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter subsidiary" />
							<DropDown
								label="Type"
								name="type"
								value="Select"
								dropdown={[ 'General', 'Issue', 'Inventory' ]}
								setValue={this.setValue}
							/>
							<View style={{ height: 10 }} />
							<DropDown
								label="Status"
								name="status"
								value="Select"
								dropdown={[ 'Active' ]}
								setValue={this.setValue}
							/>
                            <View style={{ height: 10 }} />

							<Text style={[ form.label, { marginTop: 20 } ]}>Created by</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter user name" />
							<Text style={[ form.label, { marginTop: 20 } ]}>Assigned by</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter user name" />

							<View style={{ height: 30 }} />
						</React.Fragment>
					)}
                    {this.state.formnumber == 2 && (
						<React.Fragment>
							<Text style={[ form.label, { marginTop: 20 } ]}>Preferred Vendor</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter vendor name" />
                            <DatePicker label="Reported on" value="12-06-2019" name="repOn" setValue={this.setValue} />
                            <Text style={[ form.label, { marginTop: 20 } ]}>Assigned to</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter user name" />
                            <Text style={[ form.label, { marginTop: 20 } ]}>PO Notes</Text>
							<TextInput
								style={[ form.inputarea, { marginTop: -25 } ]}
								placeholder="Enter notes"
								multiline={true}
								numberOfLines={4}
							/>
                            <Text style={[ form.label, { marginTop: 0 } ]}>Vendor Notes</Text>
							<TextInput
								style={[ form.inputarea, { marginTop: -25 } ]}
								placeholder="Enter notes"
								multiline={true}
								numberOfLines={4}
							/>
							<View style={{ height: 30 }} />
						</React.Fragment>
					)}
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