import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput, Switch, SafeAreaView } from 'react-native';

import form from './styles/formstyle';

import { Slidebutton, DropDown, DatePicker, InputField, SuggestionField } from '../helpers';
import { GlobalContext } from '../../provider';

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
		this.data = {
			truck: props.context.truckdata,
			trailer: props.context.trailerdata
		};
		this.state = {
			editdata: {
				title: '',
				category: { name: '' },
				division: { name: '' },
				equipmentType: 'TRUCK',
				truck: { unitNo: '' },
				trailer: { unitNo: '' }
			},
			formnumber: 1,
			override: false,
			tab1: 'active',
			tab2: 'notactive',
			activetab: 1,
			checkboxes: checkboxstartvalue,
			activedrop: false
		};
	}

	addeddata = {};

	componentDidMount() {
		this.setState({ editdata: this.props.navigation.getParam('rowdata') }, () => console.log(this.state.editdata));
	}

	goback = () => {
		if (this.state.formnumber == 1) {
			this.props.navigation.goBack(null);
		} else {
			this.setState({ formnumber: this.state.formnumber - 1 });
		}
	};

	handleSubmit = () => {
		if (this.state.formnumber == 3) {
			console.log(this.addeddata);
		} else {
			this.setState({ formnumber: this.state.formnumber + 1 });
		}
	};

	getValue = (key, value) => {
		if (value != this.state.editdata[key]) {
			this.addeddata[key] = value;
		} else {
			delete this.addeddata[key];
		}
		console.log(this.addeddata);
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>
						{this.state.editdata != null ? `Issue # - ${this.state.editdata.id}` : 'Add issue'}
					</Text>
				</View>
				<ScrollView style={form.mainform} nestedScrollEnabled={true}>
					<Text style={form.partnumber}>{`${this.state.formnumber}/3 `}</Text>
					{this.state.formnumber == 1 && (
						<React.Fragment>
							<InputField
								placeholder="Enter title"
								label="Title"
								value={this.state.editdata.title}
								validate={[ 'empty' ]}
								name="title"
								getValue={this.getValue}
							/>
							<DropDown
								label="Equipment Type"
								name="equipmentType"
								value={this.state.editdata.equipmentType}
								dropdown={[ 'TRUCK', 'TRAILER' ]}
								getValue={this.getValue}
							/>
							<SuggestionField
								name="unitNo"
								getValue={this.getValue}
								placeholder="Enter unit number"
								label="Unit number"
								value={this.state.editdata[this.state.editdata.equipmentType.toLowerCase()]['unitNo']}
								dropdowndata={this.data[this.state.editdata.equipmentType.toLowerCase()]}
							/>
							<InputField
								placeholder="Enter category"
								label="Category"
								value={this.state.editdata.category.name}
								validate={[ 'empty' ]}
								name="category"
								getValue={this.getValue}
							/>
							<InputField
								placeholder="Enter division"
								label="Division"
								value={this.state.editdata.division.name}
								validate={[ 'empty' ]}
								name="subsidiary"
								getValue={this.getValue}
							/>
							{/* <DropDown
								label="Type"
								name="type"
								value="Select"
								dropdown={[ 'General', 'Truck', 'Trailer' ]}
								setValue={this.setValue}
							/>
							<DropDown
								label="Status"
								name="status"
								value="Select"
								dropdown={[ 'Open', 'Active', 'Inactive' ]}
								setValue={this.setValue}
							/> */}

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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
										<Switch
											style={{ transform: [ { scaleX: 0.75 }, { scaleY: 0.75 } ] }}
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
							<View style={{ height: 10 }} />
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

const issueform = (props) => (
	<GlobalContext.Consumer>{(context) => <IssuesForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default issueform;
