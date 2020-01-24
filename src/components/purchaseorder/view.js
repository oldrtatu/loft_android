import React from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
	Platform,
	Modal,
	SafeAreaView,
	Dimensions
} from 'react-native';

import viewstyle from './styles/poview';
import { GlobalContext } from '../../provider';
import RNFetchBlob from 'rn-fetch-blob';

import back from '../../assets/back.png';
import errorimage from '../../assets/error.png'

class PurchaseOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowdata: null,
			source: '',
			imageview: false
		};
	}
	componentDidMount() {
		this.setState({ rowdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	editdata = () => {
		this.props.navigation.navigate('Form', { rowdata: this.state.rowdata, changedata: this.changedata });
	};

	changedata = (data) => {
		if (data.issues) {
			let issues = [ ...this.state.rowdata.issues ];
			let keys = [];
			let indexes = [];
			for (let i in issues) {
				keys.push(issues[i].id);
				indexes.push(i);
			}
			for (let issue of data.issues) {
				if (keys.indexOf(issue.id) > -1) {
					if (issue.status != 'OPEN') {
						issues[indexes[keys.indexOf(issue.id)]] = issue;
					} else {
						issues.splice(indexes[keys.indexOf(issue.id)], 1);
					}
				} else {
					if (issue.status != 'OPEN') {
						issues.push(issue);
					}
				}
			}
			data.issues = issues;
		}
		this.setState({ rowdata: { ...this.state.rowdata, ...data } });
	};

	viewAttachment = (item) => {
		let extension = item.substring(item.lastIndexOf('.') + 1, item.length);
		let name = item.substring(item.indexOf('Z') + 1, item.length);
		if (Platform.OS == 'android') {
			let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
			if (extension != 'pdf') {
				this.setState({
					source: item,
					imageview: true
				});
			} else {
				RNFetchBlob.config({
					addAndroidDownloads: {
						useDownloadManager: true,
						title: name,
						description: 'View document',
						mime: `application/${extension}`,
						mediaScannable: true,
						path: path,
						notification: true
					}
				})
					.fetch('GET', this.props.context.url + item, {
						Authorization: `Bearer ${this.props.context.token}`
					})
					.then((res) => {
						const android = RNFetchBlob.android;
						android.actionViewIntent(res.path(), `application/${extension}`);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else if (Platform.OS == 'ios') {
			if (extension != 'pdf') {
				this.setState({
					source: item,
					imageview: true
				});
			} else {
				let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
				RNFetchBlob.config({
					path,
					overwrite: true
				})
					.fetch('GET', this.props.context.url + item, {
						Authorization: `Bearer ${this.props.context.token}`
					})
					.then((res) => {
						RNFetchBlob.ios.openDocument(res.path());
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	};

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={viewstyle.topbar}>
					<TouchableOpacity activeOpacity={1} style={viewstyle.backcontainer} onPress={this.goback}>
						<Image source={back} style={viewstyle.backimage} />
					</TouchableOpacity>
					<Text style={viewstyle.heading}>PO# - {this.state.rowdata.id}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Unit Number</Text>
							<Text style={viewstyle.righttext}>
								{this.state.rowdata[this.state.rowdata.equipmentType.toLowerCase()]['unitNo']}
							</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Equipment Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.equipmentType}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Division</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.division.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Category</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.category.name}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.poType}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reporting Time</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.reportingTime}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						{this.state.rowdata.vendor && (
							<View style={viewstyle.row}>
								<Text style={viewstyle.lefttext}>Vendor name</Text>
								<Text style={viewstyle.righttext}>{this.state.rowdata.vendor.name}</Text>
							</View>
						)}
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Created by</Text>
							<Text style={viewstyle.righttext}>{`${this.state.rowdata.createdBy.firstName} ${this.state
								.rowdata.createdBy.lastName}`}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Assigned by</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.assignedBy}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Assigned to</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.assignedTo}</Text>
						</View>
					</View>
					{this.state.rowdata.poNotes ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>PO Notes</Text>
									<Text style={viewstyle.longtext}>{this.state.rowdata.poNotes}</Text>
								</View>
							</View>
						</React.Fragment>
					) : null}
					{this.state.rowdata.vendorNotes ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Vendor Notes</Text>
									<Text style={viewstyle.longtext}>{this.state.rowdata.vendorNotes}</Text>
								</View>
							</View>
						</React.Fragment>
					) : null}
					{this.state.rowdata.issues ? (
						this.state.rowdata.issues.length > 0 && (
							<React.Fragment>
								<View style={viewstyle.separator} />
								<View style={viewstyle.details}>
									<View style={viewstyle.paragraph}>
										<Text style={viewstyle.longtextheading}>Issues</Text>
										{this.state.rowdata.issues.map((item, i) => (
											<View style={viewstyle.row} key={i}>
												<Text style={viewstyle.leftissuetext}>{item.id}</Text>
												<Text style={viewstyle.righttext}>{item.status}</Text>
											</View>
										))}
									</View>
								</View>
							</React.Fragment>
						)
					) : null}
					{this.state.rowdata.attachments ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Attachments</Text>
									{this.state.rowdata.attachments.split(',').map((item, i) => (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => this.viewAttachment(item)}
											key={i}
											style={viewstyle.attachments}
										>
											<Text style={viewstyle.attachmentsname}>
												{item.substring(item.indexOf('Z') + 1, item.length)}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						</React.Fragment>
					) : null}
					<View style={{ height: 80 }} />
				</ScrollView>
				<TouchableOpacity activeOpacity={1} style={viewstyle.editbutton} onPress={this.editdata}>
					<Text style={viewstyle.editbuttontext}>{`EDIT `}</Text>
				</TouchableOpacity>

				<Modal visible={this.state.imageview} transparent={false} animated={true}>
					<Image
						source={{
							uri: this.props.context.url + this.state.source,
							headers: {
								Authorization: `Bearer ${this.props.context.token}`
							},
							method: 'GET'
						}}
						style={{
							width: Dimensions.get('window').width,
							resizeMode: 'contain',
							height: Dimensions.get('window').height
						}}
					/>
					<TouchableOpacity
						activeOpacity={0.5}
						style={{ position: 'absolute', top: 50, right: 0, height: 50, width: 50 }}
						onPress={() => this.setState({ imageview: false })}
					>
						<Image source={errorimage} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
					</TouchableOpacity>
				</Modal>
			</React.Fragment>
		) : (
			<ActivityIndicator />
		);
	}
}

const poview = (props) => (
	<GlobalContext.Consumer>{(context) => <PurchaseOrder context={context} {...props} />}</GlobalContext.Consumer>
);
export default poview;
