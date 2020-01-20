import React from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
	SafeAreaView,
	Platform
} from 'react-native';

import viewstyle from './styles/poview';
import { GlobalContext } from '../../provider';
import RNFetchBlob from 'rn-fetch-blob';

import back from '../../assets/back.png';

class PurchaseOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowdata: null
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
		if(data.issues){
			for(let i in data.issues){
				if(data.issues[i].status == 'OPEN'){
					data.issues.splice(i,1)
				}
			}
		}
		this.setState({ rowdata: { ...this.state.rowdata, ...data } });
	};

	viewAttachment = (item) => {
		let extension = item.substring(item.lastIndexOf('.')+1, item.length);
		let name = item.substring(item.indexOf('Z') + 1, item.length);
		let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
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
				if ((Platform.OS = 'android')) {
					const android = RNFetchBlob.android;
					android.actionViewIntent(res.path(), `application/${extension}`);
				} else {
					RNFetchBlob.ios.openDocument(res.path());
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
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
