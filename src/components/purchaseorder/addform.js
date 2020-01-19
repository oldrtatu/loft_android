import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, SafeAreaView, Platform } from 'react-native';

import form from './styles/formstyle';

import { Slidebutton, DropDown, DatePicker, InputField, SuggestionField, TextArea, IncrementField, AttachmentField } from '../helpers';
import { GlobalContext } from '../../provider';

import Snackbar from 'react-native-snackbar';

import back from '../../assets/back.png';

class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			truck: props.context.truckdata ? props.context.truckdata : [],
			trailer: props.context.trailerdata ? props.context.trailerdata : [],
			category: props.context.categorydata ? props.context.categorydata : [],
			vendor: props.context.vendordata ? props.context.vendordata : []
		};
		this.state = {
			editdata: {
				equipmentType: 'TRUCK',
				truck: { unitNo: '' },
				trailer: { unitNo: '' },
				category: { name: '' },
				division: { name: '' },
				type: 'GENERAL',
				status: 'ACTIVE',
				createdBy: 'Yash Malik',
				assignedBy: 'Yash Malik',
				vendor: { name: '' },
				reportedOn: '',
				assignedTo: 'Neil Patrick',
				ponotes: '',
				vendornotes: ''
			},
			formnumber: 3,
			reload: false
		};
	}

	goback = () => {
		if (this.state.formnumber == 1) {
			this.props.navigation.goBack(null);
		} else {
			this.setState({ formnumber: this.state.formnumber - 1 });
		}
	};

	validateFirstForm = () => {
		let err = '';
		// if (this.state.editdata[this.state.editdata.equipmentType.toLowerCase()].unitNo == '') {
		// 	err = 'Enter Unit Number';
		// } else if (this.state.editdata.category.name == '') {
		// 	err = 'Enter category';
		// }
		return err;
	};

	validateSecondForm = () => {
		return '';
	};

	validateThirdForm = () => {
		return '';
	};

	handleSubmit = () => {
		let err = '';
		err = this.validateFirstForm();
		if (err == '' && this.state.editdata.type == 'AXLE') {
			this.validateSecondForm();
		}
		if (err == '') {
			this.validateThirdForm();
		}
		if (err == '') {
			let addeddata = JSON.parse(JSON.stringify(this.state.editdata));

			// this.props.context.adddata('/po/po', 'podata', addeddata);
			// this.props.navigation.goBack();
		} else {
			Snackbar.show({
				title: err,
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#D62246'
			});
			this.setState({ reload: true }, () => this.setState({ reload: false }));
		}
	};

	navigateFront = () => {
		if (this.state.formnumber == 1) {
			let err = '';
			err = this.validateFirstForm();
			if (err != '') {
				Snackbar.show({
					title: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
				return;
			} else {
				this.setState({ formnumber: this.state.formnumber + 1 });
			}
		} else {
			let err = '';
			err = this.validateSecondForm();
			if (err != '') {
				Snackbar.show({
					title: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
				return;
			}
			this.setState({ formnumber: this.state.formnumber + 1 });
		}
	};

	getValue = (key, value) => {
		let ob = { ...this.state.editdata };
		ob[key] = value;
		this.setState({ editdata: ob });
	};
	getVendor = (item) => {
		this.setState({ editdata: { ...this.state.editdata, vendor: item } });
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{'Add PO '}</Text>
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
								dropdown={[ 'GENERAL', 'INVENTORY', 'ISSUES' ]}
								getValue={this.getValue}
								disabled={false}
							/>
							<DropDown
								label="Status"
								name="status"
								value={this.state.editdata.status}
								dropdown={[ 'ACTIVE' ]}
								getValue={this.getValue}
								disabled={false}
							/>
							<InputField
								placeholder="Enter user name"
								label="Created by"
								value={this.state.editdata.createdBy}
								validate={[ 'empty' ]}
								name="createdBy"
								getValue={this.getValue}
								editable={false}
							/>
							<InputField
								placeholder="Enter user name"
								label="Assigned by"
								value={this.state.editdata.assignedBy}
								validate={[ 'empty' ]}
								name="assignedBy"
								getValue={this.getValue}
								editable={false}
							/>
						</React.Fragment>
					)}
					{this.state.formnumber == 2 && (
						<React.Fragment>
							<SuggestionField
								name="name"
								getValue={this.getVendor}
								placeholder="Enter preferred vendor"
								label="Preferred vendor"
								value={this.state.editdata.vendor.name}
								dropdowndata={this.data.vendor}
								editable={true}
							/>
							<DatePicker
								label="Reported On"
								value={this.state.editdata.reportedOn}
								name="reportedOn"
								setValue={this.getValue}
								editable={true}
							/>
							<InputField
								placeholder="Enter user name"
								label="Assigned to"
								value={this.state.editdata.assignedTo}
								validate={[ 'empty' ]}
								name="assignedTo"
								getValue={this.getValue}
								editable={false}
							/>
							<TextArea
								placeholder="Enter PO notes"
								label="PO notes"
								value={this.state.editdata.ponotes}
								validate={[]}
								name="ponotes"
								getValue={this.getValue}
								editable={true}
							/>
							<TextArea
								placeholder="Enter vendor notes"
								label="Vendor notes"
								value={this.state.editdata.vendornotes}
								validate={[]}
								name="vendornotes"
								getValue={this.getValue}
								editable={true}
							/>
						</React.Fragment>
					)}
                    {
                        this.state.formnumber == 3 && (
                            <AttachmentField/>
                        )
                    }
				</ScrollView>
			</React.Fragment>
		);
	}
}

const poaddform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default poaddform;
