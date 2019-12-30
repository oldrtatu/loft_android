import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput, Animated, TouchableHighlight } from 'react-native';
import SwipeOut from 'react-native-swipeout'

import form from './styles/formstyle';
import AutoFillTwoFields from '../helpers/AutoFillTwoFields';
import IncrementField from '../helpers/IncrementField';
import DropDown from '../helpers/DropDown';
import DatePicker from '../helpers/DatePicker';

import back from '../../assets/back.png';

import autofill from './autofilldata.json';

class InventoryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editdata: null,
			error: {
				name: 'start',
				code: 'start',
				aquan: 'start'
			},
			itemdata: autofill
		};
	}

	addeddata = {};

	componentDidMount() {
		this.setState({ editdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	setItem = (value) => {
		let ob = { ...this.addeddata };
		ob['name'] = value.name;
		ob['code'] = value.name;
		this.addeddata = ob;
	};

	setNumbers = (field, value) => {
		let ob = { ...this.addeddata };
		ob[field] = value;
		this.addeddata = ob;
	};

	render() {
		return (
			<React.Fragment>
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>
						{this.state.editdata != null ? this.state.editdata.name : 'Add inventory'}
					</Text>
				</View>
				<ScrollView style={form.mainform} nestedScrollEnabled={true}>
					<AutoFillTwoFields
						list={this.state.itemdata}
						renderListItem={(item) => this.renderListItem(item)}
						startSuggestingFrom={1}
						inputStyle={[ form.input, form[this.state.error.name] ]}
						suggestBoxStyle={form.suggestbox}
						hideBox={this.state.hideNameBox}
						label={[ 'Item name', 'Item code' ]}
						placeholder={[ 'Enter item name', 'Enter item code' ]}
						field1="name"
						field2="code"
						value={
							this.state.editdata != null ? (
								[ this.state.editdata.name, this.state.editdata.code.toString() ]
							) : (
								[ '', '' ]
							)
						}
						setItem={this.setItem}
					/>
					<IncrementField
						value="0"
						setNumbers={this.setNumbers}
						name="aquan"
						unit="pieces"
						label="Actual Quantity"
					/>
					<IncrementField
						value="0"
						setNumbers={this.setNumbers}
						name="squan"
						unit="pieces"
						label="In stock Quantity"
					/>
					<DropDown
						label="Status"
						name="status"
						value="Select"
						dropdown={[ 'Active', 'Inactive' ]}
						suggestBoxStyle={form.suggestbox}
						setValue={this.setNumbers}
					/>
					<DatePicker label="Inventory check date" value="12-06-2019" name="invcheck" setValue={this.setNumbers} />
					<IncrementField
						value="0"
						setNumbers={this.setNumbers}
						name="reorderat"
						unit="pieces"
						label="Reorder at"
					/>

					<Text style={[ form.label, { marginTop: 20 } ]}>Preferred Vendor</Text>
					<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter preferrred vendor" />
					<Text style={[ form.label, { marginTop: 20 } ]}>Notes</Text>
					<TextInput style={[ form.inputarea, { marginTop: -25 } ]} placeholder="Enter notes" multiline={true} numberOfLines={4} />
				</ScrollView>
				<SwipeOut backgroundColor={"#90b7fb"} close>
					<TouchableOpacity activeOpacity={1} style={form.editbutton} >
						<Text style={form.editbuttontext}>Slide to Save</Text>
					</TouchableOpacity>
				</SwipeOut>
				
			</React.Fragment>
		);
	}
}

export default InventoryForm;
