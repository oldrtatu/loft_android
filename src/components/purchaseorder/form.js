import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	Dimensions,
	SafeAreaView,
	Platform,
	Modal
} from 'react-native';

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
		this.previousdata = JSON.parse(JSON.stringify(props.navigation.getParam('rowdata')));
		this.data = {
			truck: props.context.truckdata ? props.context.truckdata : [],
			trailer: props.context.trailerdata ? props.context.trailerdata : [],
			category: props.context.categorydata ? props.context.categorydata : [],
			vendor: props.context.vendordata ? props.context.vendordata : [],
			issues: props.context.issuesdata ? JSON.parse(JSON.stringify(convertback(props.context.issuesdata))) : [],
			user: props.context.user_data,
			issuesdata: props.context.issuesdata ? props.context.issuesdata : {}
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
				createdBy: { firstName: '', lastName: '' },
				assignedBy: '',
				vendor: { name: '' },
				reportingTime: '',
				assignedTo: '',
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

	componentDidMount() {
		let ob = JSON.parse(JSON.stringify(this.props.navigation.getParam('rowdata')));
		ob['type'] = ob.poType;
		if (ob.vendor == null) {
			ob.vendor = { name: '' };
		}
		ob.addedissues = [];
		for (let i in ob.issues) {
			let issue = this.data.issuesdata[ob.issues[i].id];
			ob.addedissues.push(issue);
		}
		ob.issues = [];
		let issues = [];
		for (let i in this.data.issues) {
			let issue = this.data.issues[i];
			let unitNo = ob[ob.equipmentType.toLowerCase()]['unitNo'];
			if (issue.equipmentType == ob.equipmentType && issue.status == 'OPEN') {
				if (issue[issue.equipmentType.toLowerCase()]['unitNo'] == unitNo) {
					issues.push(issue);
				}
			}
		}
		ob['issues'] = issues;
		ob['poNotes'] = null;
		if (ob.attachments != null) {
			this.files = [ ...ob.attachments.split(',') ];
		}
		this.setState({ editdata: { ...ob, height: ob.addedissues.length * 70 } });
	}

	files = [];
	addeddata = {};

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
		if (this.state.editdata.category.name == '') {
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

	getAllIssues = () => {
		let ob = {};
		for (let i in this.previousdata.issues) {
			ob[this.previousdata.issues[i].id] = {
				id: this.previousdata.issues[i].id,
				status: this.previousdata.issues[i].status
			};
		}
		for (let i in this.state.editdata.addedissues) {
			let issue = this.state.editdata.addedissues[i];
			if (ob[issue.id]) {
				if (issue.status != ob[issue.id].status) {
					ob[issue.id].status = issue.status;
				} else {
					delete ob[issue.id];
				}
			} else {
				ob[issue.id] = { id: issue.id, status: issue.status };
			}
		}
		for (let i in this.state.editdata.issues) {
			let issue = this.state.editdata.issues[i];
			if (ob[issue.id]) {
				ob[issue.id].status = issue.status;
			}
		}
		const changedObject = convertback(ob);
		if (changedObject.length > 0) {
			return changedObject;
		}
		return [];
	};

	handleSubmit = async() => {
		let err = '';
		err = this.validateFirstForm();
		if (err == '' && this.state.editdata.type == 'ISSUES') {
			err = this.validateSecondForm();
		}
		if (err == '') {
			err = this.validateThirdForm();
		}
		if (err == '') {
			let addeddata = JSON.parse(JSON.stringify(this.addeddata));
			let issue = await this.getAllIssues();
			if (issue.length > 0) {
				addeddata.issues = issue;
			}
			let str = this.files.join(',')
			if (str != this.previousdata.attachments) {
				addeddata['attachments'] = str;
			}
			if (addeddata.length != 0) {
				addeddata.id = this.state.editdata.id;
				this.props.context.updatedata('/po/po', 'podata', addeddata);
				this.props.navigation.goBack();
				this.props.navigation.state.params.changedata(addeddata);
			} else {
				this.props.navigation.goBack();
			}
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
		if (value != this.previousdata[key]) {
			this.addeddata[key] = value;
		} else {
			delete this.addeddata[key];
		}
	};

	getUnit = (item) => {
		return;
	};

	getCategory = (item) => {
		if (JSON.stringify(item) != JSON.stringify(this.previousdata.category)) {
			this.addeddata.category = item;
		} else {
			delete this.addeddata.category;
		}
		this.setState({ editdata: { ...this.state.editdata, category: item } });
	};

	getVendor = (item) => {
		if (JSON.stringify(item) != JSON.stringify(this.previousdata.category)) {
			this.addeddata.vendor = item;
		} else {
			delete this.addeddata.vendor;
		}
		this.setState({ editdata: { ...this.state.editdata, vendor: item, vendorNotes: item.notes } });
	};

	sendfiles = (data) => {
		this.files = data;
	};

	getIssue = (key, value, index) => {
		let addedissues = [ ...this.state.editdata.addedissues ];
		let issue = addedissues[index];
		issue[key] = value;
		this.setState({ editdata: { ...this.state.editdata, addedissues } });
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
		const dat = this.props.navigation.getParam('rowdata');
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{`PO # - ${this.state.editdata.id}`}</Text>
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
							disabled={true}
						/>
						<SuggestionField
							name="unitNo"
							getValue={this.getUnit}
							placeholder="Enter unit number"
							label="Unit number"
							value={this.state.editdata[this.state.editdata.equipmentType.toLowerCase()]['unitNo']}
							dropdowndata={this.data[this.state.editdata.equipmentType.toLowerCase()]}
							editable={false}
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
							disabled={true}
						/>
						<DropDown
							label="Status"
							name="status"
							value={this.state.editdata.status}
							dropdown={dat.poType == 'GENERAL' ? [ 'ACTIVE', 'COMPLETE' ] : [ 'ACTIVE' ]}
							getValue={this.getValue}
							disabled={false}
						/>
						<InputField
							placeholder="Enter user name"
							label="Created by"
							value={
								this.state.editdata.createdBy.firstName + '' + this.state.editdata.createdBy.lastName
							}
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
							editable={dat.vendor ? false : true}
						/>
						<TimePicker
							label="Reporting Time"
							value={this.state.editdata.reportingTime}
							name="reportingTime"
							setValue={this.getValue}
							editable={false}
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
						<AttachmentField files={this.state.editdata.attachments} sendfiles={this.sendfiles} />
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
									value={data.item.status}
									dropdown={[ 'ASSIGNED', 'COMPLETE', 'INCOMPLETE' ]}
									getValue={this.getIssue}
									index={data.index}
									disabled={false}
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
				<Modal animated={false} visible={this.state.uploading} transparent={true}>
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

const poeditform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default poeditform;
