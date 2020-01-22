import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView, Platform, Modal } from 'react-native';

import form from './styles/formstyle';

import { Slidebutton, DropDown, InputField, SuggestionField, TextArea, AttachmentField, TimePicker } from '../helpers';
import IssueDropDown from '../helpers/IssueLinkDropDown';
import { GlobalContext } from '../../provider';
import Snackbar from 'react-native-snackbar';
import { convertback } from '../helpers/convertdata';
import { SwipeListView } from 'react-native-swipe-list-view';
import { UIActivityIndicator } from 'react-native-indicators';
import { add_attachment } from '../../provider/updatedata';

import back from '../../assets/back.png';
import viewrow from '../../assets/viewdata.png';
import deleterow from '../../assets/deleterow.png';

class AddForm extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			truck: props.context.truckdata ? props.context.truckdata : [],
			trailer: props.context.trailerdata ? props.context.trailerdata : [],
			category: props.context.categorydata ? props.context.categorydata : [],
			vendor: props.context.vendordata ? props.context.vendordata : [],
			issues: props.context.issuesdata ? JSON.parse(JSON.stringify(convertback(props.context.issuesdata))) : [],
			user: props.context.user_data
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
				createdBy: `${this.data.user.firstName} ${this.data.user.lastName}`,
				assignedBy: `${this.data.user.firstName} ${this.data.user.lastName}`,
				vendor: { name: '' },
				reportingTime: '',
				assignedTo: `${this.data.user.firstName} ${this.data.user.lastName}`,
				poNotes: '',
				vendorNotes: '',
				issues: [],
				addedissues: [],
				height: 20
			},
			issuevalue: '',
			formnumber: 1,
			reload: false,
			refreshing: false,
			uploading: false
		};
	}

	files = [];

	goback = () => {
		if (this.state.formnumber == 1) {
			this.props.navigation.goBack(null);
		} else {
			if (this.state.formnumber == 3) {
				if (this.state.editdata.type == 'ISSUES') {
					this.setState({ formnumber: this.state.formnumber - 1 });
				} else {
					this.setState({ formnumber: this.state.formnumber - 2 });
				}
			} else {
				this.setState({ formnumber: this.state.formnumber - 1 });
			}
		}
	};

	validateFirstForm = () => {
		let err = '';
		if (this.state.editdata[this.state.editdata.equipmentType.toLowerCase()].unitNo == '') {
			err = 'Enter Unit Number';
		} else if (this.state.editdata.category.name == '') {
			err = 'Enter category';
		}
		return err;
	};

	validateSecondForm = () => {
		if (this.state.editdata.addedissues.length == 0) {
			return 'Add issues';
		}
		return '';
	};

	validateThirdForm = () => {
		if (this.state.editdata.reportingTime == '') {
			return 'Enter reporting time';
		} else {
			return '';
		}
	};

	handleSubmit = async () => {
		let err = '';
		err = this.validateFirstForm();
		if (err == '' && this.state.editdata.type == 'ISSUES') {
			err = this.validateSecondForm();
		}
		if (err == '') {
			err = this.validateThirdForm();
		}
		if (err == '') {
			let addeddata = JSON.parse(JSON.stringify(this.state.editdata));

			delete addeddata['height'];
			delete addeddata['issues'];

			addeddata['issues'] = [ ...addeddata['addedissues'] ];
			delete addeddata['addedissues'];

			if(this.state.editdata.type == 'ISSUES'){
				let issues = (this.props.context.issuesdata)?this.props.context.issuesdata:{}
				for(let issue of addeddata.issues){
					issues[issue.id].status= 'ASSIGNED'
				}
			}

			addeddata['categoryId'] = addeddata.category.id;
			addeddata['divisionId'] = addeddata.division.id;
			addeddata['createdById'] = this.data.user.id;
			addeddata['createdBy'] = {
				firstName: this.data.user.firstName,
				lastName: this.data.user.lastName,
				id: this.data.user.id
			};
			if (addeddata.vendor.name == '') {
				addeddata.vendor = null;
			} else {
				addeddata['vendorId'] = addeddata.vendor.id;
			}
			delete addeddata.vendorNotes;

			addeddata['poType'] = addeddata.type
			delete addeddata.type

			addeddata[`${addeddata.equipmentType.toLowerCase()}Id`] =
				addeddata[addeddata.equipmentType.toLowerCase()]['id'];
			if (addeddata.equipmentType.toLowerCase() == 'truck') {
				delete addeddata.trailer;
			} else {
				delete addeddata.truck;
			}
			let str = this.files.join(',')
			if (str != '') {
				addeddata['attachments'] = str;
			}

			this.props.context.adddata('/po/po', 'podata', addeddata);
			this.props.navigation.goBack();

		} else {
			Snackbar.show({
				text: err,
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
					text: err,
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
					text: err,
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

	getCategory = (item) => {
		this.setState({ editdata: { ...this.state.editdata, category: item } });
	};

	getVendor = (item) => {
		this.setState({ editdata: { ...this.state.editdata, vendor: item, vendorNotes: item.notes } });
	};

	sendfiles = (data) => {
		this.files = data;
	};

	getIssue = (key, value) => {
		return;
	};

	viewIssue = (item) => {
		this.props.navigation.navigate('ViewIssue', { rowdata: item });
	};

	addIssue = (data) => {
		this.setState({ refreshing: true });
		let addedissues = [ ...this.state.editdata.addedissues ];
		data.item.status = 'ASSIGNED';
		addedissues.push(data.item);
		let issues = [ ...this.state.editdata.issues ];
		issues.splice(data.index, 1);

		this.setState({
			editdata: {
				...this.state.editdata,
				addedissues,
				issues,
				height: addedissues.length * 75
			},
			refreshing: false
		});
	};

	deleteissue = (data) => {
		this.setState({ refreshing: true });
		let addedissues = [ ...this.state.editdata.addedissues ];
		addedissues.splice(data.index, 1);
		let issues = [ ...this.state.editdata.issues ];
		data.item.status = 'OPEN';
		issues.push(data.item);
		this.setState({
			editdata: {
				...this.state.editdata,
				addedissues,
				issues,
				height: addedissues.length * 75
			},
			refreshing: false
		});
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
						<TimePicker
							label="Reporting Time"
							value={this.state.editdata.reportedOn}
							name="reportingTime"
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
							value={this.state.editdata.poNotes}
							validate={[]}
							name="poNotes"
							getValue={this.getValue}
							editable={true}
						/>
						<TextArea
							placeholder="Enter vendor notes"
							label="Vendor notes"
							value={this.state.editdata.vendorNotes}
							validate={[]}
							name="vendorNotes"
							getValue={this.getValue}
							editable={false}
						/>
						<AttachmentField sendfiles={this.sendfiles} />
						<View style={{ height: 80 }} />
					</ScrollView>
				)}
				{this.state.formnumber == 2 && (
					<View style={form.mainform}>
						<Text style={[ form.partnumber, { flex: 0 } ]}>{`${this.state.formnumber}/3 `}</Text>
						<Text style={form.already}>Already added</Text>
						<SwipeListView
							data={this.state.editdata.addedissues}
							renderItem={(data) => (
								<IssueDropDown
									label={`${data.item.id.toString()} - ${data.item.title}`}
									name="status"
									value={'ASSIGNED'}
									dropdown={[ 'ASSIGNED' ]}
									getValue={this.getIssue}
									disabled={true}
								/>
							)}
							keyExtractor={(data) => data.id.toString()}
							rightOpenValue={-70}
							leftOpenValue={70}
							refreshing={this.state.refreshing}
							renderHiddenItem={(data) => (
								<View style={form.rowback}>
									<TouchableOpacity style={form.addissue} onPressIn={() => this.viewIssue(data.item)}>
										<Image source={viewrow} style={form.backimage} />
									</TouchableOpacity>
									<TouchableOpacity style={form.deleteissue} onPressIn={() => this.deleteissue(data)}>
										<Image source={deleterow} style={form.backimage} />
									</TouchableOpacity>
								</View>
							)}
							style={{ maxHeight: this.state.editdata.height }}
						/>
						<Text style={form.already}>Available</Text>
						<SwipeListView
							data={this.state.editdata.issues}
							renderItem={(data) => (
								<IssueDropDown
									label={`${data.item.id.toString()} - ${data.item.title}`}
									name="status"
									value={data.item.status}
									dropdown={[ 'OPEN' ]}
									getValue={this.getIssue}
									disabled={true}
								/>
							)}
							keyExtractor={(data) => data.id.toString()}
							rightOpenValue={-70}
							leftOpenValue={70}
							refreshing={this.state.refreshing}
							renderHiddenItem={(data) => (
								<View style={form.rowback}>
									<TouchableOpacity style={form.addnewissue} onPressIn={() => this.addIssue(data)}>
										<Text style={form.addissuetext}>ADD</Text>
									</TouchableOpacity>
									<TouchableOpacity style={form.addissue} onPressIn={() => this.viewIssue(data.item)}>
										<Image source={viewrow} style={form.backimage} />
									</TouchableOpacity>
								</View>
							)}
						/>
					</View>
				)}
				<Modal animated={false} visible={this.state.uploading}>
					<View
						style={{
							backgroundColor: '#000',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height,
							opacity: 0.7
						}}
					/>
					<View
						style={{
							position: 'absolute',
							top: 0,
							justifyContent: 'center',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height
						}}
					>
						<UIActivityIndicator color="#fff" size={50} />
					</View>
				</Modal>
				<Slidebutton submit={this.handleSubmit} reload={this.state.reload} />
			</React.Fragment>
		);
	}
}

const poaddform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default poaddform;
