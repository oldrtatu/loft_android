import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, SafeAreaView, Platform } from 'react-native';

import form from './styles/formstyle';

import {
	Slidebutton,
	DropDown,
	DatePicker,
	InputField,
	SuggestionField,
	TextArea,
	IncrementField,
	AttachmentField
} from '../helpers';
import { GlobalContext } from '../../provider';

import Snackbar from 'react-native-snackbar';

import back from '../../assets/back.png';
import { convertback } from '../helpers/convertdata';
import { SwipeListView } from 'react-native-swipe-list-view';

class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			truck: props.context.truckdata ? props.context.truckdata : [],
			trailer: props.context.trailerdata ? props.context.trailerdata : [],
			category: props.context.categorydata ? props.context.categorydata : [],
			vendor: props.context.vendordata ? props.context.vendordata : [],
			issues: props.context.issuesdata ? convertback(props.context.issuesdata) : []
		};
		this.state = {
			editdata: {
				equipmentType: 'TRUCK',
				truck: { unitNo: '' },
				trailer: { unitNo: '' },
				category: { name: '' },
				division: { name: '' },
				type: 'ISSUES',
				status: 'ACTIVE',
				createdBy: 'Yash Malik',
				assignedBy: 'Yash Malik',
				vendor: { name: '' },
				reportedOn: '',
				assignedTo: 'Neil Patrick',
				ponotes: '',
				vendornotes: '',
				issues: this.data.issues
			},
			issuevalue: '',
			formnumber: 2,
			reload: false
		};
	}
	files = [];

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
				if (this.state.editdata.type == 'ISSUES') {
					this.setState({ formnumber: this.state.formnumber + 1 });
				} else {
					this.setState({ formnumber: this.state.formnumber + 2 });
				}
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
			if (this.state.editdata.type == 'ISSUES') this.setState({ formnumber: this.state.formnumber + 1 });
		}
	};

	getValue = (key, value) => {
		let ob = { ...this.state.editdata };
		ob[key] = value;
		this.setState({ editdata: ob });
	};

	getUnit = (item) => {
		let ob = { ...this.state.editdata };
		ob['division'] = item.division;
		ob[this.state.editdata.equipmentType.toLowerCase()] = { unitNo: item.unitNo, id: item.id };
		let issues = [];
		for (let i in this.data.issues) {
			let issue = this.data.issues[i];
			console.log(item.unitNo);
			if (issue.equipmentType == this.state.editdata.equipmentType && issue.status == 'OPEN') {
				if (issue[issue.equipmentType.toLowerCase()]['unitNo'] == item.unitNo) {
					issues.push(issue);
				}
			}
		}
		ob['issues'] = issues;
		this.setState({
			editdata: ob
		});
	};

	getVendor = (item) => {
		this.setState({ editdata: { ...this.state.editdata, vendor: item } });
	};

	sendfiles = (data) => {
		this.files = data;
	};
	getIssue = (key, value) => {
		return;
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
					{this.state.formnumber == 1 ? (
						<TouchableOpacity activeOpacity={1} style={form.nextbutton} onPress={this.navigateFront}>
							<Text style={{ color: '#fff', fontSize: 18 }}>{`Next `}</Text>
						</TouchableOpacity>
					) : null}
					{this.state.formnumber == 2 && this.state.editdata.type == 'ISSUES' ? (
						<TouchableOpacity activeOpacity={1} style={form.nextbutton} onPress={this.navigateFront}>
							<Text style={{ color: '#fff', fontSize: 18 }}>{`Next `}</Text>
						</TouchableOpacity>
					) : null}
				</View>
				{this.state.formnumber == 1 && (
					<ScrollView style={form.mainform} nestedScrollEnabled={true}>
						<Text style={form.partnumber}>{`${this.state.formnumber}/3 `}</Text>
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
							dropdown={[ 'GENERAL', 'ISSUES' ]}
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
					</ScrollView>
				)}
				{this.state.formnumber == 3 && (
					<ScrollView style={form.mainform} nestedScrollEnabled={true}>
						<Text style={form.partnumber}>{`${this.state.formnumber}/3 `}</Text>
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
						<AttachmentField sendfiles={this.sendfiles} />
					</ScrollView>
				)}
				{this.state.formnumber == 2 && (
					<View style={form.mainform}>
						<Text style={[form.partnumber,{flex:0}]}>{`${this.state.formnumber}/3 `}</Text>
						<SwipeListView
							data={this.state.editdata.issues}
							renderItem={(data) => (
								<DropDown
									label={`${data.item.id.toString()} - ${data.item.title}`}
									name="status"
									value={data.item.status}
									dropdown={[ 'OPEN' ]}
									getValue={this.getIssue}
									disabled={true}
								/>
							)}
							keyExtractor={(data) => data.id.toString()}
							rightOpenValue={-40}
							leftOpenValue={0}
							renderHiddenItem={(data) => (
								<TouchableOpacity style={form.rowback}>
									<Text style={form.addissue}>ADD</Text>
								</TouchableOpacity>
							)}
							style={{flex:1}}
						/>
					</View>
				)}
			</React.Fragment>
		);
	}
}

const poaddform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default poaddform;
