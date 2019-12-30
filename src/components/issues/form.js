import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import form from './styles/formstyle';

import SuggestionField from '../helpers/SuggestionField';
import Slidebutton from '../helpers/slidebutton';
import DropDown from '../helpers/DropDown';
import DatePicker from '../helpers/DatePicker';

import back from '../../assets/back.png';

import truckdata from './sampledata.json';
import trailerdata from './trailerdata.json';

const checkboxstartvalue = {
	truck: {
		driver: {
			inside: {
				front: false,
				rear: false,
				steer: false
			},
			outside: {
				front: false,
				rear: false,
				steer: false
			}
		},
		passenger: {
			inside: {
				front: false,
				rear: false,
				steer: false
			},
			outside: {
				front: false,
				rear: false,
				steer: false
			}
		}
	},
	trailer: {
		driver: {
			inside: {
				number1: false,
				number2: false,
				number3: false,
				number4: false,
				number5: false
			},
			outside: {
				number1: false,
				number2: false,
				number3: false,
				number4: false,
				number5: false
			}
		},
		passenger: {
			inside: {
				number1: false,
				number2: false,
				number3: false,
				number4: false,
				number5: false
			},
			outside: {
				number1: false,
				number2: false,
				number3: false,
				number4: false,
				number5: false
			}
		}
	}
};

class IssuesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editdata: null,
			formnumber: 1,
			equipment: 'truck',
			override: false,
			tab1: 'active',
			tab2: 'notactive',
			activetab: 1,
			checkboxes: checkboxstartvalue
		};
	}

	data = {
		truck: truckdata,
		trailer: trailerdata
	};

	addeddata = {};

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
		if (this.state.formnumber == 3) {
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
						{this.state.editdata != null ? this.state.editdata.id : 'Add issue'}
					</Text>
				</View>
				<ScrollView style={form.mainform} nestedScrollEnabled={true}>
					<Text style={form.partnumber}>{this.state.formnumber}/3  </Text>
					{this.state.formnumber == 1 && (
						<React.Fragment>
							<Text style={[ form.label, { marginTop: 20 } ]}>Title</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter title" />
							<DropDown
								label="Equipment Type"
								name="equipment"
								value="Select"
								dropdown={[ 'Truck', 'Trailer' ]}
								setValue={this.setEquipment}
							/>
							<SuggestionField
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
							/>
							<Text style={[ form.label, { marginTop: 20 } ]}>Category</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter category" />
							<Text style={[ form.label, { marginTop: 20 } ]}>Subsidiary</Text>
							<TextInput style={[ form.input, { marginTop: -25 } ]} placeholder="Enter subsidiary" />
							<DropDown
								label="Type"
								name="type"
								value="Select"
								dropdown={[ 'General', 'Truck', 'Trailer' ]}
								setValue={this.setValue}
							/>
							<View style={{ height: 10 }} />
							<DropDown
								label="Status"
								name="status"
								value="Select"
								dropdown={[ 'Open', 'Active', 'Inactive' ]}
								setValue={this.setValue}
							/>

							<View style={{ height: 30 }} />
						</React.Fragment>
					)}
					{this.state.formnumber == 2 && (
						<React.Fragment>
							<View style={form.tabswitch}>
								<TouchableOpacity
									activeOpacity={0.7}
									style={[ form.tabtitleview, form[this.state.tab1] ]}
									onPress={() => this.setState({ tab1: 'active', tab2: 'notactive', activetab: 1 })}
								>
									<Text style={form.tabtitle}>Driver Side</Text>
								</TouchableOpacity>
								<TouchableOpacity
									activeOpacity={0.7}
									style={[ form.tabtitleview, form[this.state.tab2] ]}
									onPress={() => this.setState({ tab1: 'notactive', tab2: 'active', activetab: 2 })}
								>
									<Text style={form.tabtitle}>Passenger Side</Text>
								</TouchableOpacity>
							</View>
							{this.state.activetab == 1 &&
							this.state.equipment == 'truck' && (
								<View style={form.checkmaincontainer}>
									<Text style={form.checkheading}>Inside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Front</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.inside.front}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.inside.front = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Steer</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.inside.steer}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.inside.steer = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Rear</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.inside.rear}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.inside.rear = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<Text style={form.checkheading}>Outside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Front</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.outside.front}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.outside.front = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Steer</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.outside.steer}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.outside.steer = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Rear</Text>
										<CheckBox
											value={this.state.checkboxes.truck.driver.outside.rear}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.driver.outside.rear = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
								</View>
							)}
							{this.state.activetab == 2 &&
							this.state.equipment == 'truck' && (
								<View style={form.checkmaincontainer}>
									<Text style={form.checkheading}>Inside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Front</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.inside.front}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.inside.front = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Steer</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.inside.steer}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.inside.steer = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Rear</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.inside.rear}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.inside.rear = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<Text style={form.checkheading}>Outside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Front</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.outside.front}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.outside.front = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Steer</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.outside.steer}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.outside.steer = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Rear</Text>
										<CheckBox
											value={this.state.checkboxes.truck.passenger.outside.rear}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.truck.passenger.outside.rear = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
								</View>
							)}
							{this.state.activetab == 1 &&
							this.state.equipment == 'trailer' && (
								<View style={form.checkmaincontainer}>
									<Text style={form.checkheading}>Inside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 1</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.inside.number1}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.inside.number1 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 2</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.inside.number2}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.inside.number2 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 3</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.inside.number3}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.inside.number3 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 4</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.inside.number4}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.inside.number4 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 5</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.inside.number5}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.inside.number5 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<Text style={form.checkheading}>Outside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 1</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.outside.number1}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.outside.number1 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 2</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.outside.number2}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.outside.number2 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 3</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.outside.number3}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.outside.number3 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 4</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.outside.number4}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.outside.number4 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 5</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.driver.outside.number5}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.driver.outside.number5 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
								</View>
							)}
							{this.state.activetab == 2 &&
							this.state.equipment == 'trailer' && (
								<View style={form.checkmaincontainer}>
									<Text style={form.checkheading}>Inside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 1</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.inside.number1}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.inside.number1 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 2</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.inside.number2}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.inside.number2 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 3</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.inside.number3}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.inside.number3 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 4</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.inside.number4}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.inside.number4 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 5</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.inside.number5}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.inside.number5 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<Text style={form.checkheading}>Outside</Text>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 1</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.outside.number1}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.outside.number1 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 2</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.outside.number2}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.outside.number2 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 3</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.outside.number3}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.outside.number3 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 4</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.outside.number4}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.outside.number4 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
									<View style={form.checkboxcontainer}>
										<Text style={form.checktext}>Number 5</Text>
										<CheckBox
											value={this.state.checkboxes.trailer.passenger.outside.number5}
											onValueChange={(val) => {
												let ob = { ...this.state.checkboxes };
												ob.trailer.passenger.outside.number5 = val;
												this.setState({ checkboxes: ob });
											}}
										/>
									</View>
								</View>
							)}
						</React.Fragment>
					)}
					{this.state.formnumber == 3 && (
						<React.Fragment>
							<Text style={[ form.label, { marginTop: 20 } ]}>Odometer</Text>
							<TextInput
								style={[ form.input, { marginTop: -25 } ]}
								placeholder="Enter value"
								keyboardType="numeric"
							/>
							<DatePicker label="Reported on" value="12-06-2019" name="repOn" setValue={this.setValue} />
							<DatePicker label="Posted on" value="12-06-2019" name="repOn" setValue={this.setValue} />
							<DatePicker label="Due on" value="12-06-2019" name="repOn" setValue={this.setValue} />
							<Text style={[ form.label, { marginTop: 20 } ]}>Period</Text>
							<TextInput
								style={[ form.input, { marginTop: -25 } ]}
								placeholder="Enter value"
								keyboardType="numeric"
							/>
							<DropDown
								label="Period unit"
								name="periodUnit"
								value="Select"
								dropdown={[ 'Days', 'Weeks', 'Months', 'Years' ]}
								setValue={this.setValue}
							/>
                            <View style={{height:10}}/>
							<Text style={[ form.label, { marginTop: 20 } ]}>Description</Text>
							<TextInput
								style={[ form.inputarea, { marginTop: -25 } ]}
								placeholder="Enter description"
								multiline={true}
								numberOfLines={4}
							/>
						</React.Fragment>
					)}
				</ScrollView>
				{this.state.formnumber == 3 ? (
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

export default IssuesForm;
