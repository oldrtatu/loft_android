import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, SafeAreaView, Platform } from 'react-native';

import form from './styles/formstyle';

import { Slidebutton, DropDown, DatePicker, InputField, SuggestionField, TextArea } from '../helpers';
import { GlobalContext } from '../../provider';

import Snackbar from 'react-native-snackbar';

import back from '../../assets/back.png';

const checkboxstartvalue = {
	truck: {
		driver: {
			'BACK INSIDE': false,
			'BACK OUTSIDE': false,
			'FRONT INSIDE': false,
			'FRONT OUTSIDE': false,
			STEER: false
		},
		passenger: {
			'BACK INSIDE': false,
			'BACK OUTSIDE': false,
			'FRONT INSIDE': false,
			'FRONT OUTSIDE': false,
			STEER: false
		}
	},
	trailer: {
		driver: {
			'1 INSIDE': false,
			'2 INSIDE': false,
			'3 INSIDE': false,
			'4 INSIDE': false,
			'5 INSIDE': false,
			'1 OUTSIDE': false,
			'2 OUTSIDE': false,
			'3 OUTSIDE': false,
			'4 OUTSIDE': false,
			'5 OUTSIDE': false
		},
		passenger: {
			'1 INSIDE': false,
			'2 INSIDE': false,
			'3 INSIDE': false,
			'4 INSIDE': false,
			'5 INSIDE': false,
			'1 OUTSIDE': false,
			'2 OUTSIDE': false,
			'3 OUTSIDE': false,
			'4 OUTSIDE': false,
			'5 OUTSIDE': false
		}
	}
};

class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			truck: props.context.truckdata ? props.context.truckdata : [],
			trailer: props.context.trailerdata ? props.context.trailerdata : [],
			category: props.context.categorydata ? props.context.categorydata : []
		};
		this.state = {
			editdata: {
				id: '',
				title: '',
				category: { name: '' },
				division: { name: '' },
				equipmentType: 'TRUCK',
				truck: { unitNo: '' },
				trailer: { unitNo: '' },
				type: 'SELECT',
				status: 'OPEN',
				typeDriverSide: JSON.parse(JSON.stringify(checkboxstartvalue.truck.driver)),
				typePassengerSide: JSON.parse(JSON.stringify(checkboxstartvalue.truck.passenger)),
				odometer: '',
				reportedOn: '',
				dueOn: '',
				postedOn: '',
				period: '',
				periodUnit: 'DAYS',
				description: ''
			},
			formnumber: 1,
			tab1: 'active',
			tab2: 'notactive',
            activetab: 1,
            reload:false
		};
	}

	validateFirstForm = () => {
		let err = '';
		if (this.state.editdata.title == '') {
			err = 'Enter title';
		} else if (this.state.editdata[this.state.editdata.equipmentType.toLowerCase()].unitNo == '') {
			err = 'Enter Unit Number';
		} else if (this.state.editdata.category.name == '') {
			err = 'Enter category';
		} else if (this.state.editdata.type == 'SELECT') {
			err = 'Enter type';
		}
		return err;
	};

	validateSecondForm = () => {
		let err = '';
		for (let item in this.state.editdata.typeDriverSide) {
			if (this.state.editdata.typeDriverSide[item] == true) {
				err = 'driver';
				break;
			}
		}
		for (let item in this.state.editdata.typePassengerSide) {
			if (this.state.editdata.typePassengerSide[item] == true) {
				err = 'passenger';
				break;
			}
		}
		if (err != 'driver' && err != 'passenger') {
			return 'Select one axle please';
		} else {
			return '';
		}
	};

	validateThirdForm = () => {
		let err = '';
		if (this.state.editdata.odometer == '') {
			err = 'Enter odometer value';
		} else if (this.state.editdata.reportedOn == '') {
			err = 'Select reporting date and time';
		} else if (this.state.editdata.postedOn == '') {
			err = 'Select posting date and time';
		}else if (this.state.editdata.status == 'DEFERRED') {
			if (this.state.editdata.dueOn == '') {
				err = 'Select due on date and time';
			}
		} else if (this.state.editdata.type == 'RECURRENCE') {
			if (this.state.editdata.period == '') {
				err = 'Select period';
			}
		}
		return err;
	};

	handleSubmit = () => {
		let err = '';
		err = this.validateFirstForm();
		if (err == '' && this.state.editdata.type == 'AXLE') {
			err = this.validateSecondForm();
		}
		if (err == '') {
			err = this.validateThirdForm();
		}
		if (err == '') {
            let addeddata = JSON.parse(JSON.stringify(this.state.editdata))

            addeddata["categoryId"] = addeddata.category.id

			addeddata["divisionId"] = addeddata.division.id
			
            let equipment = addeddata.equipmentType.toLowerCase()
            addeddata[`${equipment}Id`] = addeddata[equipment]["id"]

            if(addeddata.type != "AXLE"){
                delete addeddata["typeDriverSide"]
                delete addeddata["typePassengerSide"]
            }
            if(addeddata.status != "DEFERRED"){
                delete addeddata["dueOn"]
            }
            if(addeddata.type != "RECURRENCE"){
                delete addeddata["period"]
                delete addeddata["periodUnit"]
            }
            if(addeddata.description == ""){
                delete addeddata["description"]
            }
            delete addeddata["id"]

            this.props.context.adddata('/po/issue', 'issuesdata', addeddata);
            this.props.navigation.goBack();

		} else {
			Snackbar.show({
				text: err,
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#D62246'
            });
            this.setState({reload:true},()=>this.setState({reload:false}))
		}
	};

	goback = () => {
		if (this.state.formnumber == 1) {
			this.props.navigation.goBack(null);
		} else {
			if (this.state.formnumber == 3) {
				if (this.state.editdata.type == 'AXLE') {
					this.setState({ formnumber: this.state.formnumber - 1 });
				} else {
					this.setState({ formnumber: this.state.formnumber - 2 });
				}
			} else {
				this.setState({ formnumber: this.state.formnumber - 1 });
			}
		}
	};

	navigateFront = () => {
		if (this.state.formnumber == 1) {
			let err = '';
            err = this.validateFirstForm()
			if (err != '') {
				Snackbar.show({
					text: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
				return;
			} else {
				if (this.state.editdata.type == 'AXLE') {
					this.setState({ formnumber: this.state.formnumber + 1 });
				} else {
					this.setState({ formnumber: this.state.formnumber + 2 });
				}
			}
		} else {
			let err = '';
            err = this.validateSecondForm()
			if (err != '') {
				Snackbar.show({
					text: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
				return;
			}
			this.setState({ formnumber: this.state.formnumber + 1 });
		}
	};

	getValue = (key, value) => {
		if (key == 'equipmentType') {
			if (value != this.state.equipmentType) {
				console.log(value);
				let ob = JSON.parse(JSON.stringify(this.state.editdata));
				ob['typeDriverSide'] = JSON.parse(JSON.stringify(checkboxstartvalue[value.toLowerCase()]['driver']));
				ob['typePassengerSide'] = JSON.parse(
					JSON.stringify(checkboxstartvalue[value.toLowerCase()]['passenger'])
				);
				ob['equipmentType'] = value;
				this.setState(
					{
						editdata: JSON.parse(JSON.stringify(ob))
					},
					() => console.log(this.state.editdata)
				);
			}
		} else {
			let ob = { ...this.state.editdata };
			ob[key] = value;
			this.setState({ editdata: ob });
		}
	};

	getUnit = (item) => {
		let ob = { ...this.state.editdata };
		ob['division'] = item.division;
		ob[this.state.editdata.equipmentType.toLowerCase()] = { unitNo: item.unitNo, id: item.id };
		this.setState({
			editdata: ob
		});
	};

	getCategory = (item) => {
		this.setState({ editdata: { ...this.state.editdata, category: item } });
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{'Add issue '}</Text>
					{this.state.formnumber != 3 ? (
						<TouchableOpacity activeOpacity={1} style={form.nextbutton} onPress={this.navigateFront}>
							<Text style={{ color: '#fff', fontSize: 18 }}>{`Next `}</Text>
						</TouchableOpacity>
					) : null}
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
								editable={true}
							/>
							<DropDown
								label="Equipment Type"
								name="equipmentType"
								value={this.state.editdata.equipmentType}
								dropdown={[ 'TRUCK', 'TRAILER' ]}
								getValue={this.getValue}
								disabled={false}
							/>
							<SuggestionField
								name="unitNo"
								getValue={this.getUnit}
								placeholder="Enter unit number"
								label="Unit number"
								value={this.state.editdata[this.state.editdata.equipmentType.toLowerCase()]['unitNo']}
								dropdowndata={this.data[this.state.editdata.equipmentType.toLowerCase()]}
								editable={true}
							/>
							<SuggestionField
								placeholder="Enter category"
								label="Category"
								value={this.state.editdata.category.name}
								name="name"
								getValue={this.getCategory}
								editable={true}
								dropdowndata={this.data.category}
							/>
							<InputField
								placeholder="Enter division"
								label="Division"
								value={this.state.editdata.division.name}
								validate={[ 'empty' ]}
								name="subsidiary"
								getValue={this.getValue}
								editable={false}
							/>
							<DropDown
								label="Type"
								name="type"
								value={this.state.editdata.type}
								dropdown={[ 'AXLE', 'GENERAL', 'RECURRENCE' ]}
								getValue={this.getValue}
								disabled={false}
							/>
							<DropDown
								label="Status"
								name="status"
								value={this.state.editdata.status}
								dropdown={[ 'OPEN', 'DEFERRED' ]}
								getValue={this.getValue}
								disabled={false}
							/>
							<View style={{ height: 70 }} />
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
							this.state.editdata.type == 'AXLE' && (
								<View style={form.checkmaincontainer}>
									{Object.keys(this.state.editdata.typeDriverSide).map((item, i) => (
										<View style={form.checkboxcontainer} key={i}>
											<Text style={form.checktext}>{item}</Text>
											<Switch
												style={
													Platform.OS == 'ios' ? (
														{ transform: [ { scaleX: 0.6 }, { scaleY: 0.6 } ] }
													) : (
														{ transform: [ { scaleX: 0.8 }, { scaleY: 0.8 } ] }
													)
												}
												value={this.state.editdata.typeDriverSide[item]}
												onValueChange={(val) => {
													let ob = { ...this.state.editdata };
													ob.typeDriverSide[item] = val;
													this.setState({ editdata: ob });
												}}
											/>
										</View>
									))}
								</View>
							)}
							{this.state.activetab == 2 &&
							this.state.editdata.type == 'AXLE' && (
								<View style={form.checkmaincontainer}>
									{Object.keys(this.state.editdata.typePassengerSide).map((item, i) => (
										<View style={form.checkboxcontainer} key={i}>
											<Text style={form.checktext}>{item}</Text>
											<Switch
												style={
													Platform.OS == 'ios' ? (
														{ transform: [ { scaleX: 0.6 }, { scaleY: 0.6 } ] }
													) : (
														{ transform: [ { scaleX: 0.8 }, { scaleY: 0.8 } ] }
													)
												}
												value={this.state.editdata.typePassengerSide[item]}
												onValueChange={(val) => {
													let ob = { ...this.state.editdata };
													ob.typePassengerSide[item] = val;
													this.setState({ editdata: ob });
												}}
											/>
										</View>
									))}
								</View>
							)}
						</React.Fragment>
					)}
					{this.state.formnumber == 3 && (
						<React.Fragment>
							<InputField
								placeholder="Odometer reading"
								label="Odometer"
								value={this.state.editdata.odometer.toString()}
								validate={[ 'empty', 'number' ]}
								name="odometer"
								getValue={this.getValue}
								editable={true}
								keyBoardType="number-pad"
							/>
							<DatePicker
								label="Reported on"
								value={this.state.editdata.reportedOn}
								name="reportedOn"
								setValue={this.getValue}
								editable={true}
								maximumDate={new Date()}
								minimumDate={new Date(2010, 0, 1)}
							/>
							<DatePicker
								label="Posted on"
								value={this.state.editdata.postedOn}
								name="postedOn"
								setValue={this.getValue}
                                editable={true}
								maximumDate={new Date()}
								minimumDate={new Date()}
							/>
							{this.state.editdata.status == 'DEFERRED' ? (
								<DatePicker
									label="Due on"
									value={this.state.editdata.dueOn}
									name="dueOn"
									setValue={this.getValue}
									editable={true}
									maximumDate={new Date(2030, 12, 12)}
									minimumDate={new Date()}
								/>
							) : null}
							{this.state.editdata.type == 'RECURRENCE' ? (
								<React.Fragment>
									<InputField
										placeholder="Enter Period"
										label="Period"
										value={this.state.editdata.period.toString()}
										validate={[ 'empty', 'number' ]}
										name="period"
										getValue={this.getValue}
										editable={true}
										keyBoardType="number-pad"
									/>
									<DropDown
										label="Period Unit"
										name="periodUnit"
										value={this.state.editdata.periodUnit}
										dropdown={[ 'DAYS', 'WEEKS', 'MONTHS', 'YEAR' ]}
										getValue={this.getValue}
										disabled={false}
									/>
								</React.Fragment>
							) : null}
							<TextArea
								placeholder="Enter description"
								label="Description"
								value={this.state.editdata.description}
								validate={[]}
								name="description"
								getValue={this.getValue}
								editable={true}
								keyBoardType="number-pad"
							/>
						</React.Fragment>
					)}
				</ScrollView>
				<Slidebutton submit={this.handleSubmit} reload={this.state.reload} />
			</React.Fragment>
		);
	}
}

const issueaddform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default issueaddform;
